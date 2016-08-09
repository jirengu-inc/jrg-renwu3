<div align="center">
    <h2>登陆后台</h2><br/>

    <?php echo form_open('login'); ?>

    <!--form name="input" class="form-horizontal" align="center" style="margin-top: 2%" method="post"-->
        <label for="loginName">用户名：</label>
        <input type="input" name="loginName" /><br />

        <label for="pwd">密&nbsp&nbsp&nbsp&nbsp码：</label>
        <input type="password" name="pwd" style="margin-right: 1px" /><br /><br />

        <button type="submit" class="btn btn-info" style="width:200px;">登录</button><br/><br/>
        <a href="http://www.baidu.com" style="margin-left:150px;">注册账号</a>
    </form>

    <?php $err=validation_errors(); ?>
    <div class="alert alert-warning" style="width: 300px;" <?php echo empty($err)?"hidden":""; ?> >
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <?php echo $err; ?>
    </div>
</div>
