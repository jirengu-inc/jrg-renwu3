<!--七牛上传的代码-->

<script src="http://cdn.bootcss.com/plupload/2.1.9/plupload.full.min.js"></script>
<script src="http://cdn.bootcss.com/qiniu-js/1.0.15-beta/qiniu.min.js"></script>

<script type="text/javascript">
var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
    browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
    uptoken : <?php echo "'$uptoken'"; ?>, // uptoken是上传凭证，由其他程序生成
    // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
    // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
    //    // do something
    //    return uptoken;
    // },
    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
    // downtoken_url: '/downtoken',
    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
    unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
    // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
    domain: 'http://qiniu.6dbox.cn',     // bucket域名，下载资源时用到，必需
    container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
    max_file_size: '10mb',             // 最大文件体积限制
    flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash，相对路径
    max_retries: 3,                     // 上传失败最大重试次数
    dragdrop: true,                     // 开启可拖曳上传
    drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: '4mb',                  // 分块上传时，每块的体积
    auto_start: false,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
    multi_selection: false,
    filters: {
      mime_types : [
        {title : "Image files", extensions: "jpg,jpeg,gif,png"}
      ]
    },
        init: {
            'FilesAdded': function(up, files) {
                $('#fileinfo1').val(files[0].name);
            },
            'BeforeUpload': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // if (up.runtime === 'html5' && chunk_size) {
                //     progress.setChunkProgess(chunk_size);
                // }
            },
            'UploadProgress': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));

                // progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                alert('上传完成！请确保您上传的图片的横宽比是正确的，否则可能出现比例上的问题！');
            },
            'FileUploaded': function(up, file, info) {
                $('#pic95_url').val('http://qiniu.6dbox.cn/'+eval('('+info+')').key);
            },
            'Error': function(up, err, errTip) {
                alert("上传失败！请重新登陆获取token！");
                // $('table').show();
                // var progress = new FileProgress(err.file, 'fsUploadProgress');
                // progress.setError();
                // progress.setStatus(errTip);
            }
        }
    });

    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });

    $('#up_load').on('click', function(){
        uploader.start();
    });
    $('#stop_load').on('click', function(){
        uploader.stop();
    });

    var Q2 = new QiniuJsSDK();
    var uploader2 = Q2.uploader({
    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
    browse_button: 'pickfiles2',         // 上传选择的点选按钮，必需
    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
    uptoken : <?php echo "'$uptoken'"; ?>, // uptoken是上传凭证，由其他程序生成
    // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
    // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
    //    // do something
    //    return uptoken;
    // },
    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
    // downtoken_url: '/downtoken',
    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
    unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
    // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
    domain: 'http://qiniu.6dbox.cn',     // bucket域名，下载资源时用到，必需
    container: 'container2',             // 上传区域DOM ID，默认是browser_button的父元素
    max_file_size: '10mb',             // 最大文件体积限制
    flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash，相对路径
    max_retries: 3,                     // 上传失败最大重试次数
    dragdrop: true,                     // 开启可拖曳上传
    drop_element: 'container2',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: '4mb',                  // 分块上传时，每块的体积
    auto_start: false,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
    multi_selection: false,
    filters: {
      mime_types : [
        {title : "Image files", extensions: "jpg,jpeg,gif,png"}
      ]
    },
        init: {
            'FilesAdded': function(up, files) {
                $('#fileinfo2').val(files[0].name);
            },
            'BeforeUpload': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // if (up.runtime === 'html5' && chunk_size) {
                //     progress.setChunkProgess(chunk_size);
                // }
            },
            'UploadProgress': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));

                // progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                alert('上传完成！请确保您上传的图片的横宽比是正确的，否则可能出现比例上的问题！');
            },
            'FileUploaded': function(up, file, info) {
                $('#pic22_url').val('http://qiniu.6dbox.cn/'+eval('('+info+')').key);
            },
            'Error': function(up, err, errTip) {
                alert("上传失败！请重新登陆获取token！");
                // $('table').show();
                // var progress = new FileProgress(err.file, 'fsUploadProgress');
                // progress.setError();
                // progress.setStatus(errTip);
            }
        }
    });

    uploader2.bind('FileUploaded', function() {
        console.log('hello man 2,a file is uploaded');
    });
    $('#up_load2').on('click', function(){
        uploader2.start();
    });
    $('#stop_load2').on('click', function(){
        uploader2.stop();
    });
</script>