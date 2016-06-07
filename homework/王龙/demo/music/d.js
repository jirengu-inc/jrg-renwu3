



//这个方法处理歌词，把源字符串修改成两个数组。一个是时间数组，一个是歌词数组，返回一个数组，
/**
 *
 * @param string  歌词
 * @returns {Array}
 * @constructor
 */
function Dolyric(string){
    var St    = string,//接收原始字符串
        textArr   = St.split('['),//执行第一次分割
        timeArr   = [],//时间数组
        lyricArr  = [],//歌词数组
        returnArr = [];//将要返回的数组

    //时间初步提取，歌词提取
    for( var i in textArr){
        var arr = textArr[i].split(']');//第二次分割
        timeArr.push(arr[0]);
        lyricArr.push(arr[1]);
    }
    //把时间处理成以毫秒为单位的时间
    for(var i in timeArr){
        var time        = timeArr[i].split(':');//目的获取分钟
        minute      = parseInt(time[0])*60*1000;//分钟转化成毫秒
        second      = parseInt(time[1])*1000,//秒转化成毫秒
            millisecond = parseInt(parseFloat(time[1])%1*100),//获取毫秒
            timeArr[i]  = minute + second + millisecond; //直接改变原数组的值
    }
    //因为timeArr，lyricArr的第一项为NaN，为了方便起见，删除第一项
    timeArr.shift();
    lyricArr.shift();

    //把两个数组放到将要返回的总数组里面
    returnArr = [timeArr,lyricArr]
    //console.log(returnArr);
    return returnArr;
}



function SongLyricAdd(Arr){
    $LyricList.empty();
    $LyricList.css({'top':'50%'});
    for( var i in Arr ){
        var li = '<li>'+ Arr[i] + '</li>';
        $LyricList.append(li);
    }
}

