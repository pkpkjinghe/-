window.onload = function () {
    var content = document.querySelector('.ct_content');
    var left = content.querySelector(".left");
    var ul = left.querySelector('ul');
    var ulHeight = ul.offsetHeight;
    var leftHeight = left.offsetHeight;

    var maxY = 0;
    var minY = leftHeight - ulHeight;
    var maxYYY = 100;
    var minYYY = minY - 100;
    console.log(minY);



    var startY, moveY, distanceY, currentY = 0;
    ul.addEventListener('touchstart', function (e) {
        startY = e.targetTouches[0].clientY;
    });
    ul.addEventListener('touchmove', function (e) {
        //最小值情况

        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;
        if (currentY + distanceY > maxYYY || currentY + distanceY < minYYY) {
            return;
        }
        ul.style.transition = 'none';
        ul.style.top = (currentY + distanceY) + 'px';

    });
    ul.addEventListener('touchend', function (e) {
        //静止状态下的情况
        if (currentY + distanceY > maxY) {
            ul.style.transition = 'top 0.5s linear';
            ul.style.top = maxY + 'px';
            currentY = maxY;

        } else if (currentY + distanceY < minY) {
            ul.style.transition = 'top 0.5s linear';
            ul.style.top = minY + 'px';
            currentY = minY;
        } else {
            currentY += distanceY;
        }
    });

    //点击事件1.点击改变样式2.点击对象有位移在最大最小值范围内3.注意点击穿透事件
    var lis = ul.querySelectorAll('li');

    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        li.index = i;


    }
    itcast.tap(ul, function (e) {
        for (var i = 0; i < lis.length; i++) {

            var li = lis[i];
            li.classList.remove('active');
        }
        console.log(e.target);
        e.target.parentNode.classList.add('active');
        var index= e.target.parentNode.index;
        console.log(index);
        if(index * li.offsetHeight>Math.abs(minY)){
            ul.style.transition='top 0.5s'
            ul.style.top=minY+'px';
            currentY=minY;
        }else{
            ul.style.transition='top 0.5s'
            ul.style.top = -index * li.offsetHeight + 'px';
            currentY=-index*li.offsetHeight;
        }
    //点击穿透事件利用 fastclick;

    
    })










}