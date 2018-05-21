$('.drop-down-wrap').on('click',function(){
    $(this).find('.drop-down').toggle();
});

$('.drop-down li').on('click',function(){
    var liText = $(this).text();
    $(this).parents('.drop-down-wrap').find('.bh').text(liText);
    console.log($(this).parents('.drop-down-wrap').find('.bh'));
});
