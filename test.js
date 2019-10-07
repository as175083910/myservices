const mongoose = require('mongoose');
const { connect, initSchemas } = require('./database/init');

(async () => {
    await connect();
    // const Schema = mongoose.Schema          //声明Schema
    // let ObjectId = Schema.Types.ObjectId    //声明Object类型

    // //创建我们的用户Schema
    // const userSchema = new Schema({
    //     UserId: ObjectId,
    //     userName: { unique: true, type: String },
    //     password: String,
    //     createAt: { type: Date, default: Date.now() },
    //     lastLoginAt: { type: Date, default: Date.now() }

    // })

    initSchemas();

    //发布模型
    mongoose.model('User', userSchema)
    const User = mongoose.model('User');
    let oneUser = new User({ userName: 'haiyi12', password: '123456' });
    oneUser.save().then(() => {
        console.log('插入成功');
    });
})();