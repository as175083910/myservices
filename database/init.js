const mongoose = require('mongoose');
const db = 'mongodb://localhost:8888/simle-db';

const glob = require('glob');
const { resolve } = require('path');

mongoose.Promise = global.Promise;

exports.initSchemas = () => {
    console.log('initSchemas here!');
    let gPath = resolve(__dirname,'./schema/','**/*.js');
    glob.sync(gPath).forEach(require);
}

exports.connect = () => {
    //连接数据库
    mongoose.connect(db);

    return new Promise((resolve, reject) => {
        //把所有连接放到这里
        let maxConnectTimes = 0;
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected', () => {
            //进行重连
            console.log('*****数据库断开******');
            if (maxConnectTimes < 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理……');
            };

        });

        //数据库出现错误的时候
        mongoose.connection.on('error', err => {
            console.log('*****数据库出错******');
            console.log(err);
            if (maxConnectTimes < 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            } else {
                reject(err);
                throw new Error('数据库出现问题，程序无法搞定，请人为修理……');
            };
        });

        //链接打开的时候
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected successfully!');
            resolve();
        });
    })


};