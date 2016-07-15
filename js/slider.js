window.onload = function () {
  var img = document.getElementById('slider-img'),
      list = img.getElementsByTagName('li'),
      ol = document.getElementById('slider-control'),
      a_icon = ol.getElementsByTagName('a'),
      sliderLeft = document.getElementById('slider-left'),
      sliderRight = document.getElementById('slider-right'),
      index=0,
      left = true;
      timer=null;
  for (var i = 0; i < list.length; i++) {
  // 记录唯一ID值
      list[i].id = i;
      list[i].style.left = i*20 + "%";
      list[i].onmouseover = function () {
      clearInterval(timer);
      }
      list[i].onmouseout = function () {
      timer = setInterval(autoImg,2000);
      }
  }
  // 左右点击切换
  sliderLeft.onclick = function () {
    left=true;
    tabImg();
  }

  sliderRight.onclick = function () {
    left=false;
    tabImg();
  }
  function tabImg() {
    clearInterval(timer);
    for (var i = 0; i < list.length; i++) {
      if(list[i].className === "active"){
        index = list[i].id;
      }
    }
    if(left){
      if (index<=0) {
        index = list.length-1;
      }else{
        index--;
      }
      showImg(index);
    }else{
      if (index>=list.length-1) {
        index = 0;
      }else{
        index++;
      }
      showImg(index);
    }
  }
  // 圆点点击切换
  for (var j = 0; j < a_icon.length; j++) {
    a_icon[j].id = j;
    a_icon[j].onclick = function () {
      clearInterval(timer);
      showImg(this.id);
    }
  }
  // 清除重复计时器
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  timer = setInterval(autoImg,2000);
  // 轮播函数
  function autoImg() {
    index++;
    if (index>=list.length) {
      index = 0;
    }
    showImg(index);
  }
  // 图片显示
  function showImg(curIndex) {
    // 图片底部按钮显示
    for (var i = 0; i < a_icon.length; i++) {
      a_icon[i].style.background = "";
      a_icon[list[curIndex].id].style.background = "#fff";
    }

    // 显示当前图片
    for (var j = 0; j < list.length; j++) {
      list[j].className = "";
      if (j<curIndex) {
        list[j].style.left = 80 - (curIndex-j)*20 + "%";
      }else if(j > curIndex){
        list[j].style.left = (j-curIndex)*20 + "%";
      }
      if (parseInt(list[j].style.left) === 0) {
        list[j].style.left = "20%"; 
      }
    }

    list[curIndex].style.left = "0%";
    list[curIndex].className = "active"; 
    // 重新赋值给index
    index = curIndex;
  }
}
window.onresize = function () {
  // header-slider-banner 自适应
  var img = document.getElementById('slider-img'),
      list = img.getElementsByTagName('li'),
      slider = document.getElementById('slider');
  slider.style.height = list[0].offsetHeight + "px";
}
