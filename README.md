### Sidea  [预览](https://www.haohome.top/sidea/) 
- 模拟国外的一个网站GetIdeas;
- 采用原生js开发,以练习为目的,强化原生js运用;
- 自定义方法动态更新根元素html的font-size大小,采用rem单位;
- 借助css3的媒体查询实现屏幕自适应;
- ~~数据库采用MariaDb,以Node为服务器端操作语言~~;
- 数据采用mock,当前将更多精力放在前端开发上
- webpack配置开发环境和生产环境,自动化打包html/css/js;

#### 当前进度...
 1. webpack打包环境搭建完成,实现babel的ES6转换,postcss的less语言转化以及css自动加浏览器前缀;
 2. 首页布局,采用媒体查询实现响应式布局,兼容移动端;
 3. 完成通用事件绑定方法封装;
 4. 完成ajax封装;
 5. 实现瀑布流视图方法封装;
 6. 实现tab切换显示;
 7. 首页分页查询功能完成;

#### 使用方法
1. 克隆

    `git clone git@github.com:haohome/Sidea.git`

2. 安装依赖

    运行命令`npm install`

3. 导入数据库

    在本地`localhost`的`phpAdmin`中运行`src/data` 中`sidea.sql` 文件,自动创建数据库和导入数据

4. 运行

    4.1开发模式(两种)

   ① 直接运行命令`npm run server`
   
   ② 也可先运行`npm run nodeServer`,再启动另一个控制面板运行`npm run dev`(推荐)

    4.2 生产模式

   > - 先运行`npm run build`,生成的项目文件在`dist`文件夹下;
   > - 将dist文件夹整体拷贝到服务器根目录下;
   > - 启动本地服务器;
   > - 运行`npm run nodeServer`
   > - 打开`http://localhost`或`http://127.0.0.1`即可预览
