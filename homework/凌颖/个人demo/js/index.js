

$('#dowebok').fullpage({
       verticalCentered:true,
       navigation: true,
       anchors:["page1","page2","page3","page4","page5"],
       scrollingSpeed: 500,
       css3: true,
       resize: true,
       afterRender: function(){
               $('#home_info').animate({opacity:'1'},1000,function(){
                            $("#home_info1").fadeIn(1000,function(){
                                   $('#home_info,#home_info_box').animate({width:'900px'},1000,function(){
                                          $("#home_info2").slideToggle(1000,function(){
                                                 $(this).next().slideToggle(1000,function(){
                                                        $(this).next().slideToggle(100,function(){
                                                               $(this).next().slideToggle(1000,function(){
                                                               });
                                                        });
                                                 });
                                          });
                                   });
                            });
                     });
                     $("#home_info").css({"top":$("#home_content").height()-$("#home_head_content").height()});
                     $("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
		},
       afterLoad:function(anchorLink,index){
              if (index==1) {
                     $("aside a").eq(0).addClass("selected").siblings().removeClass("selected");  
              }
              if (index==2) {
                     $("aside a").eq(1).addClass("selected").siblings().removeClass("selected");
                     $("div.title").animate({"width":"600px","opacity":"1"},1000,function(){
                            $("#div.title h2").fadeTo(1,1000,function(){
                                   });
                            });
                     $("#about_info").animate({width:"900px",marginTop:"0",marginBottom:"0"},1000,function(){
					$("#about_info p").eq(0).animate({bottom:"0"},1000,function(){
						$("#about_info p").eq(1).animate({bottom:"0"},1000,function(){
							$("#about_info p").eq(2).animate({bottom:"0"},1000,function(){
								$("#about_info p").eq(3).animate({bottom:"0"},1000);
							});
						});
					});
				});	
              }
              if (index==3) {
                    $("aside a").eq(2).addClass("selected").siblings().removeClass("selected");
                    $("div.title").animate({"width":"600px","opacity":"1"},1000,function(){
                            $("#div.title h2").fadeTo(1,1000,function(){
                                   });
                            });
                           $(document).ready(function (){
                                   $('.skill_int').hide(); 
                                   $('.skill_list').hover(function(){
                                          $('.skill_int').show(); 
                                          $(this).css({'color':'#1f3151','background-color':'#d7d8da'}); 
                                   },
                                   function(){
                                   $('.skill_int').hide(); 
                                   });
                                   $('.skill_int').hover(function(){
                                          $('.skill_int').show();
                                          },function(){
                                                 $('.skill_int').hide();
                                                 $('.skill_list').css({'color':'white','background-color':'#d7d8da'}); 
                                   });
                                   $('.skill_int li').hover(function(){
                                          $(this).css({'color':'#d7d8da','background-color':'#1f3151'});
                                   },function(){
                                          $(this).css({'color':'#2857ae','background-color':'inherit'});
                                          });
                            });       
              }
              if (index==4) {
                    $("aside a").eq(3).addClass("selected").siblings().removeClass("selected");
                     $("#demo .title").animate({"width":"600px","opacity":"1"},1000,function(){
                            $("#div.title h2").fadeTo(1,1000,function(){
                                   });
                            });
                     $("#demo_list_content a:eq(0)").animate({left:"500px"},1000,function(){
                            $("#demo_list_content a:eq(1)").animate({top:"-220px",left:"200px"},1000,function(){
                                   });
                            });
                     $("#demo_list_content a img").mouseover(function(){
                            if (this.id=="5") {
                                $("#5").attr("src","images/selected5.png");
                            }else{
                                $("#1").attr("src","images/selected1.png");
                            }
                            }); 
                     $("#demo_list_content a img").mouseout(function(){
                            if (this.id=="5") {
                                $("#5").attr("src","images/selected5_5.png");
                            }else{
                                $("#1").attr("src","images/selected1_1.png");
                            };
                            });
                    
              };
               if (index==5) {
                    $("aside a").eq(4).addClass("selected").siblings().removeClass("selected");
                    $("#contact .title").animate({"width":"600px","opacity":"1"},1000,function(){
                            $("#div.title h2").fadeTo(1,1000,function(){
                                   });
                            });
              }
       },


});
//顶部标题文字切换
	$("#header_p").mouseover(function(){
		$("#header_p1").html("Resume");
		$("#header_p2").html("前端工程师");
	}).mouseout(function(){
		$("#header_p1").html("F2E");
		$("#header_p2").html("个人简历");	
	})
//顶部导航
	$("header nav a:not(':first')").click(function(){
		alert("正在努力建设中...请稍等");
		return false;
	})
//侧边导航文字切换
	$("aside a").hover(function(){
		$(this).find("b").fadeToggle(200,"easeInOutCubic");
	})
// 头像切换
	$("#home_photo2").hover(function(){
		$(this).fadeTo(1000,1);		
		},function(){
			$(this).stop(true,false).fadeTo(1000,0);
	});
       