var express = require('express');
var app =express();

// 如果是post请求需要加载如下中间件
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
// 使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//// 直接把html文件发出去，即展示该文件
//app.get('/ajax',function (req,res,next) {
//    res.sendfile('./ajax.html');
//});

//查询微博分析结果
app.get('/api/getWeiboAnalysisResult', function (req, res,next) {
    var getWeiboAnalysisResult = { success: true,
        result:
        { id: 559,
            weiboUrl: 'http://weibo.com/1622004114/DsAI319Ai?from=page_1006061622004114_profile&wvr=6&mod=weibotime&type=comment',
            uid: '1622004114',
            screenName: '淘宝开放平台',
            content: '#QCon北京2016# 运维专场开场《海量容器系统运维实践》的讲稿实录，从多Region异地多活,统一接入和安全,Overlay网络虚拟化,以及应用模型和弹性计算几个方面来说如何做高质量架构产品化输出@QCon全球软件开发大会 @InfoQ @开发者头条 @阿里云 @阿里技术嘉年华 http://t.cn/Rq0du7c',
            uInfo:
            { allowAllActMsg: true,
                allowAllComment: false,
                avatarLarge: 'http://tp3.sinaimg.cn/1622004114/180/1284433074/1',
                biFollowersCount: 192,
                city: 1,
                createdAt: 1258688488000,
                description: '淘宝开放平台是将阿里巴巴内部的商业和能力开放出来，赋能整个商业生态。 进化新商业，开放新思维。 平台动态请关注：https://open.taobao.com 更多官方变更请关注官方公：http://open.taobao.com/support/announcement_list.htm',
                favouritesCount: 1,
                followMe: false,
                followersCount: 38483,
                following: true,
                friendsCount: 247,
                gender: 'm',
                id: '1622004114',
                lang: 'zh-cn',
                location: '浙江 杭州',
                name: '淘宝开放平台',
                onlineStatus: 0,
                profileImageURL: 'http://tp3.sinaimg.cn/1622004114/50/1284433074/1',
                profileImageUrl: 'http://tp3.sinaimg.cn/1622004114/50/1284433074/1',
                province: 33,
                screenName: '淘宝开放平台',
                statusId: '',
                statusesCount: 1764,
                uRL: 'http://open.taobao.com',
                url: 'http://open.taobao.com',
                userDomain: 'opentaobao',
                verified: true,
                verifiedReason: '淘宝开放平台部门官方微博',
                verifiedType: 2,
                verified_reason: '淘宝开放平台部门官方微博',
                weihao: '' },
            wInfo:
            { annotations: '',
                attitudesCount: 3,
                bmiddlePic: '',
                commentsCount: 12,
                createdAt: 1461562476000,
                favorited: false,
                geo: 'null',
                id: '3968142990275174',
                idstr: 3968142990275174,
                inReplyToScreenName: '',
                inReplyToStatusId: -1,
                inReplyToUserId: -1,
                latitude: -1,
                longitude: -1,
                mid: '3968142990275174',
                mlevel: 0,
                originalPic: '',
                picIds: [],
                picUrls: [],
                repostsCount: 35,
                source: [Object],
                text: '#QCon北京2016# 运维专场开场《海量容器系统运维实践》的讲稿实录，从多Region异地多活,统一接入和安全,Overlay网络虚拟化,以及应用模型和弹性计算几个方面来说如何做高质量架构产品化输出@QCon全球软件开发大会 @InfoQ @开发者头条 @阿里云 @阿里技术嘉年华 http://t.cn/Rq0du7c',
                thumbnailPic: '',
                truncated: false,
                user: [Object],
                visible: [Object] },
            totalFollows: 38483,
            simpleReport: '消息曝光量<span title="曝光量表示所有转发用户的总粉丝数">404536</span>，共计转发<b>35</b>次，其中一转<b>17</b>次，二转<b>16</b>次，三转<b>1</b>次，北京、浙江、上海地区参与转发人数较多。用户情绪指数为<b>99</b>，传递了超强的正能量。没有发现任何疑似水军。',
            detailReport: null,
            data:
            { areaMap: [   // 微博转发地域分析
                { key: '北京', value: 15 },
                { key: '浙江', value: 8 },
                { key: '上海', value: 3 },
                { key: '江苏', value: 3 },
                { key: '山东', value: 2 },
                { key: '广东', value: 2 },
                { key: '其他', value: 1 },
                { key: '海外', value: 1 } ],
                emotion: 99,  // 情感值
                levelList: [ 17, 16, 1, 0 ], // 转发层级分析
                sexMap: { '女': 1, '男': 34 }, // 性别比例
                timeList: [Object], //转发时间曲线数据
                top100User: [   // 关键传播账号
                    { followersCount: 414,
                        friendsCount: 354,
                        gender: 'm',
                        postTime: 1461581414000,
                        repostCount: 6,
                        screenName: 'wisdomyu',
                        statusMid: '3968222422190527',
                        userId: '1428493165',
                        verifiedType: '普通用户' },
                    { followersCount: 25352,
                        friendsCount: 669,
                        gender: 'm',
                        postTime: 1461563724000,
                        repostCount: 5,
                        screenName: '阿里技术嘉年华',
                        statusMid: '3968148225362229',
                        userId: '1939498534',
                        verifiedType: '企业认证（企业）' },
                    { followersCount: 16613,
                        friendsCount: 231,
                        gender: 'm',
                        postTime: 1461564477000,
                        repostCount: 4,
                        screenName: '阿里技术保障',
                        statusMid: '3968151388144939',
                        userId: '3851645388',
                        verifiedType: '企业认证（企业）' },
                    { followersCount: 957,
                        friendsCount: 874,
                        gender: 'm',
                        postTime: 1461597070000,
                        repostCount: 1,
                        screenName: '臧秀涛',
                        statusMid: '3968288091950552',
                        userId: '2710829805',
                        verifiedType: '个人认证（名人）' },
                    { followersCount: 23384,
                        friendsCount: 118,
                        gender: 'm',
                        postTime: 1461566131000,
                        repostCount: 1,
                        screenName: '阿里数据',
                        statusMid: '3968158325129144',
                        userId: '2414452832',
                        verifiedType: '企业认证（企业）' },
                    { followersCount: 8531,
                        friendsCount: 217,
                        gender: 'm',
                        postTime: 1461651555000,
                        repostCount: 1,
                        screenName: 'Docker精选',
                        statusMid: '3968516614579106',
                        userId: '5360910133',
                        verifiedType: '普通用户' } ],
                totalFollows: 404536,
                userTypeMap: { '个人认证': 3, '企业认证': 9, '微博达人': 4, '普通用户': 19 },  // 用户类型
                waterArmyMap: { false: 35, true: 0 }  // 水军分析
            },
            graphData: null, //路径传播图 xml数据
            pubTime: 'Mon Apr 25 2016 13:34:36 GMT+0800 (CST)',
            createdAt: 'Thu Apr 28 2016 17:32:29 GMT+0800 (CST)',
            updatedAt: 'Thu Apr 28 2016 17:32:32 GMT+0800 (CST)'
        }
    };
    if(req.query.id == 559){
        res.jsonp(getWeiboAnalysisResult);
    }

});

app.post('/api/example/d', function (req, res) {
    var jsondemo = {
        'jianchi':'daodi',
        'name':'shagua',
        'age':18,
        'sex':'man'
    };
    //if(req.body.id == 1){
    //    res.json(jsondemo);
    //}
    res.jsonp(jsondemo);

});
var server = app.listen(4000);
