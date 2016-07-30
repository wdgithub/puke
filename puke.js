//animate()
//queue()
//dequeue()
//delay()
//stop()
$(function(){

	// $(".animation")
	// .animate({width:400},2000)
	// .queue(function(){
	// 	$(this).css('background','red').dequeue()
	// })
	// .delay(2000)
	// .animate({height:400})
	// var w=Math.floor(Math.random()*20);
		
	// for(var i=0;i<100;i++){
	// 	var left=Math.floor(Math.random()*1000);
	// 	var top=Math.floor(Math.random()*1000)
	// 	$('<div>')
	// 	.addClass('zidan')
	// 	.width(w)
	// 	.height(w)
	// 	.css({background:'green'})
	// 	.appendTo('body')
	// 	.delay(i*10)
	// 	.animate({
	// 		left:left,
	// 		top:top,
	// 	})
	// }
	function fapai(){
		var puke=[];
		var color=['s','h','d','c'];
		var biao={};

		// console.table(puke);
		// console.log(puke);
		// console.log(biao);
		var paihao={
			1:'A',
			2:'2',
			3:'3',
			4:'4',
			5:'5',
			6:'6',
			7:'7',
			8:'8',
			9:'9',
			10:'T',
			11:'J',
			12:'Q',
			13:'K',
		}
		var index=0;
		var zhuozi=$('.zhuozi')[0];
		while(puke.length<52){
			var huase=color[Math.floor(Math.random()*4)];
			var shuzi=Math.ceil(Math.random()*13);
			//判断biao里是否有这个拍没有添加有不添加
			if(!biao[huase+'-'+shuzi]){
				puke.push({huase:huase,shuzi:shuzi});
				//给biao里添加元素
				biao[huase+'-'+shuzi]=true;
			}
		}
		var yanshi=0;
		for(var i=0;i<7;i++){
			for(var j=0;j<i+1;j++){
				yanshi+=100;
				index+=1;
				// console.log(index);
				$('<div>')
					.addClass('pai')
					.addClass('shang')
					.data('shuzi',puke[index].shuzi)
					.attr('id',i+'-'+j)
					.delay(100+yanshi)
					.css({
						// backgroundImage:'url(images/2c.png)',
						backgroundImage:'url(images/'+paihao[puke[index].shuzi]+puke[index].huase+'.png)'
					})
					.animate({
						top:i*50+'px',
						left:(6-i)*50+j*100+'px',
						opacity:1,
					})
					.appendTo(zhuozi);
			}
			// console.log(index);
		}
		var yanshi2=0
		for(;index<puke.length;index++){
			yanshi2+=100;
			$('<div>')
				.addClass('pai zuo')
				.data('shuzi',puke[index].shuzi)
				.css({
					backgroundImage:'url(images/'+paihao[puke[index].shuzi]+puke[index].huase+'.png)'
				})
				.delay(100+yanshi2)
				.animate({
					top:450,
					left:150,
					opacity:1,
				})
				.appendTo('.zhuozi');
		}
		//判断牌是否被压住
		function yapaimei(pai){
			var x=Number($(pai).attr('id').split('-')[0]);
			var y=Number($(pai).attr('id').split('-')[1]);
			if($('#'+(x+1)+'-'+y).length || $('#'+(x+1)+'-'+(y+1)).length ){
				return true;
			}else{
				return false;
			}

		}
		var diyizhang;
		//点击
		$('.zhuozi .pai').on('click',function(){
			//4-0
			//5-0 5-1
			//是否被压住
			if($(this).hasClass('shang')&&yapaimei(this)){
				return ;
			}
			//是否为13
			if($(this).data('shuzi')==13){
				$(this)
					.animate({
						top:'0',
						left:'0',
						opacity:0
					}).queue(function(){
					$(this).remove();
				})
				return;
			}
			//动画
			$(this).toggleClass('chulie');
			if($(this).hasClass('chulie')){
				console.log(8)
				$(this)
					.animate({
						top:'-=30'
					})
				// return;
			}else{
				console.log(9)
				$(this)
					.animate({
						top:'+=30'
					})
				// return;
			}

			//不是13
			if(!diyizhang){
				diyizhang=$(this);
				// console.log(1)
			}else{
				//加起来是13
				// console.log(2)
				if($(this).data('shuzi')+diyizhang.data('shuzi')==13){
					$(this)
						.delay(400)
						.animate({
							top:'0',
							left:'0',
							opacity:0
						}).queue(function(){
						$(this).remove();
					});
					diyizhang
						.animate({
							top:'0',
							left:'0',
							opacity:0
						}).queue(function(){
						$(this).remove();
					});

					diyizhang=null;
				}else{
					//加起来不是13
					if($(this).hasClass('chulie')&&diyizhang.hasClass('chulie')){
						$(this)
							.animate({
								top:'+=30',
							});
						diyizhang
							.delay(400)
							.animate({
								top:'+=30',
							});

					}
					$('.zhuozi .pai.chulie').removeClass('chulie');
					diyizhang=null;
				}
			}
		})
		//往右
		var index=1;
		$('.zhuozi .wangyou').on('click',function(){
			console.log(0);
			index+=1;
			$('.zuo')
				.eq(-1)
				.animate({
					left:450,
				}).removeClass('zuo').addClass('pai you').css({
				zIndex:index,
			});
		})
		//往左
		var num=0;
		$('.wangzuo').on('click',function(){
			console.log(1)
			$('.you').each(function(){
				num+=1;
				$(this)
					.delay(30*num)
					.animate({
						left:150,
						opacity:1
					})
					.removeClass('you')
					.addClass('zuo')
					.css({
						zIndex:0
					})
			})
		})
	}


	$('.zhuozi .a').on('click',function(){
		$('.zhuozi .youxi').animate({
			left:-351,
			opacity:0.8,
		}).css({
			backgroundImage:'url(images/xiaowang.png)'
		})
		$('.zhuozi .kaishi').animate({
			left:701,
			opacity:0.8,
		}).css({
			backgroundImage:'url(images/xiaowang.png)'
		})
		$('.a').css({
			opacity:0,
		})
		$('.kaishi .chongfa,.kaishi .jieshu,.kaishi .shuoming').animate({
			opacity:1
		})
		fapai()

	})
	$('.kaishi .chongfa').on('click',function(){
		$('.pai').remove()
		fapai()
	})
	$('.kaishi .jieshu').on('click',function(){
		$('.zhuozi .youxi').animate({
			left:0,
			opacity:1,
		}).css({
			backgroundImage:'url(images/wang.png)'
		})
		$('.zhuozi .kaishi').animate({
			left:350,
			opacity:1,
		}).css({
			backgroundImage:'url(images/wang.png)'
		})
		$('.a').css({
			opacity:1,
		})
		$('.kaishi .chongfa,.kaishi .jieshu,.kaishi .shuoming').animate({
			opacity:0
		})
		$('.pai').remove()
	})
	$('.kaishi .shuoming').on('click',function(){
		console.log(0)
		$('.youxi .shuomingzi').toggleClass('zi');
		if($('.youxi .shuomingzi').hasClass('zi')){
			$('.youxi .shuomingzi').animate({
				left:351,
				opacity:0.8,
			})
		}else{
			$('.youxi .shuomingzi').animate({
				left:-350,
				opacity:0,
			})
		}

	})

})
