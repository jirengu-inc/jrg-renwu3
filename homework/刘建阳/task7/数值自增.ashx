int n = 0; 
public void ProcessRequest (HttpContext context) { 
context.Response.ContentType = "text/html"; 

string path = context.Request.MapPath("数值自增.htm"); 
string html = System.IO.File.ReadAllText(path); 
//判断页面是否是第一次加载 
string viewstate = context.Request.Form["_viewstate"]; 
if (!string.IsNullOrEmpty(viewstate)) 
{ 
//点击按钮 post 
//获取隐藏域的值 
string s = context.Request.Form["_div"]; 
if (int.TryParse(s, out n)) 
{ 
n++; 
html = html.Replace("@n",n.ToString()); 
} 
} 
else 
{ 
//页面首次加载,给div和div对应的隐藏域赋值 
html = html.Replace("@n", n.ToString()); 
} 
context.Response.Write(html); 
} 