/*
 * @Author: Daniel Hfood 
 * @Date: 2018-03-11 20:17:13 
 * @Last Modified by: Daniel
 * @Last Modified time: 2018-04-15 00:22:40
 * @name:公共方法库
 */

var utils ={
  
  /**
   * @name:改变根元素font-size
   */
  changeRootSize: function(){
    var html=document.documentElement;  //根元素
    var clientWidth = html.clientWidth;   //viewport窗口尺寸
    if(clientWidth>600){
      clientWidth=600
    }
  //把document的fontSize大小设置成跟窗口成一定比例的大小。
    html.style.fontSize = 20 * (clientWidth / 750) + 'px';
    console.log("字体大小",html.style.fontSize);
  },

  /**
   * @name: 通用事件绑定
   * @param:elem:事件作用父元素,type:事件类型,selector:事件作用元素,fn:事件回调函数(参数代表e)
   * @description:该方法可传3个参数或4个参数,3个参数:没有冒泡,4个参数:有冒泡
   */
  bindEvents:function(elem,type,selector,fn){
    if(fn==null){		//如果没有第四个参数
      fn=selector;
      selector=null;
    }
    elem.addEventListener(type,function(e){
      e.preventDefault();
      if(selector){
        var target=e.target;
        if(target.matches(selector)){
          fn.call(target,e)
        }else if(target.parentNode.matches(selector)){
          var target=target.parentNode
          fn.call(target,e) //二级子元素
        }
        else if(target.parentNode.parentNode.matches(selector)){
          var target=target.parentNode.parentNode
          fn.call(target,e) //三级子元素
        }
      }else{
        fn(e)
      }
    })
  },
  /**
   * @name:封装ajax方法
   * @param:参数对象包含methods,url,success方法等
   */
  $:{
    /*get方法传入data,返回一个拼接好的字符串uname=min&age=12*/
    params:function(data){
      var arr=[];
      for(var key in data){
        arr.push(key+"="+data[key])//将对象键值对以字符串形式存入数组中
      }
      var str=arr.join("&");
      return str;
    },
    /*该方法发送http请求*/
    ajax:function(obj){
      var url=obj.url;
      var type=obj.method || obj.type;//支持方法属性为method或type;
      var async=obj.async == undefined ? true : obj.async;
      var data = obj.data == undefined ? {} : obj.data;
      var success=obj.success;
      var error=obj.error;
      //创建一个XMLHttpRequest 对象
      var xhr;
      if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
      }else{	//微软IE浏览器的xhr对象
        xhr=new ActiveXObject("MicroSoft.XMLHttp")
      };
      //判断请求类型是"get"还是"post"
      if(type.toLowerCase()==="get"){
        //get类型的url参数为拼接字符串
        url=url+"?"+this.params(data);
        data=null;
      }else{
        //post类型要给服务器端一个请求头
        xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded")
      }
      xhr.open(type,url,async);
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && (xhr.status==200 || xhr.status==304)){
          var respData=xhr.responseText;
          success(respData);//成功后执行的方法
        }else{
          if(error) error();
        }
      }
      //xhr.send()方法要放在后面,这样xhr.onreadystatechange方法提前绑定监听xhr.readyState,同步请求才能拿到数据
      xhr.send(data);	//get类型data为null
    }
  },
  /**
   * @name:瀑布流
   * @param:parent(容器元素)
   * @param:oneGap(只有一列时元素的间距,其他列数自适应)
   * @description:自适应瀑布流,多列间距自适应
   */
  waterFall:function (parent,oneGap){
    /**容器的宽度(包含内边距、边框) */
    var width=parent.offsetWidth;
    /**容器内盒子元素的宽度(包含内边距、边框)  */
    var items=parent.children;
    var itemWidth = items[0].offsetWidth;
    var gap=(width-parseInt(width / (itemWidth))*itemWidth)/2;
    /**计算每列放的盒子元素个数 */
    var columns = parseInt(width / (itemWidth + gap));
    /**定义一个空数组,用来储存每列元素的高度 */
    var arr = [];
    for (var i = 0; i < items.length; i++) {
      /**1.将第一行元素的高度都存到arr中 */
      if (i < columns) {
          items[i].style.top = 0;
          items[i].style.left = (itemWidth + gap) * i + 'px';
          arr.push(items[i].offsetHeight);
      } 
      /**2.找到每一行的最小高度 */
      else {
          var minHeight = arr[0];
          var index = 0;
          for (var j = 0; j < arr.length; j++) {
              if (minHeight > arr[j]) {
                  minHeight = arr[j];//获得当前行最小高度
                  index = j;          //记下当前列下标
              }
          }
          /**3.设置下一行第一个盒子的位置,
           * top值就是最小高度值+gap
           * left值就是最小列距离左边的距离
           */
          if(gap!=0){
            items[i].style.top = arr[index] + gap + 'px';
            items[i].style.left = items[index].offsetLeft + 'px';
            /**4.修改最小列的高度 
             * 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
             */
            arr[index] = arr[index] + items[i].offsetHeight + gap;
          }else{
            items[i].style.top = arr[index] + oneGap + 'px';
            items[i].style.left = 0;
            arr[index] = arr[index] + items[i].offsetHeight + oneGap;
          }
        }
      }
      //计算分页器的定位
      var contentBox=document.querySelectorAll('.content-box');
      var pagination=document.getElementById("pagination");
      utils.computeTop(contentBox,pagination);
  },
  /**
 * @name: 计算分页器的top值,设置其定位
 * @param {contentBox} 各个小box 
 * @param {pagination} 分页器对象 
 */
computeTop:function (contentBox,pagination){
  var lastEle=contentBox[contentBox.length-1];
  var last2Ele=contentBox[contentBox.length-2];
  //计算最后两个box的top和height值并比较
  var  lastTop=Number(window.getComputedStyle(lastEle,null).top.slice(0,-2));
  var  lastHeight=Number(window.getComputedStyle(lastEle,null).height.slice(0,-2));
  var  last2Top=Number(window.getComputedStyle(last2Ele,null).top.slice(0,-2));
  var  last2Height=Number(window.getComputedStyle(last2Ele,null).height.slice(0,-2));
  var top=(lastTop+lastHeight)>(lastTop+lastHeight)? (lastTop+lastHeight):(lastTop+lastHeight);
  var fontSize=Number(window.getComputedStyle(document.documentElement,null).fontSize.slice(0,-2));
  pagination.style.top=top/fontSize+4+'rem';
}
}
export default utils;