6.10
这是一个记录，每一天当中，最重要的事情的软件。

1）提醒输入
2）将输入的内容，在每个页面中显示，作为提醒。
3）隔天之后，再次出现新的提醒。

数据在db层中。也可以理解成是modal层。它本身甚至可以是一个redux。


进入app后，会先将store取出来，作为唯一的state obj。在变更后，会影响渲染。

6.13
既然有一条数据，就需要历史。然后就做历史。
然后为了历史，就需要有页面切换，模块化，等内容。
还需要对于server数据的消化（其实仍然是从db取出来的。）
这块对于db，后端，redux的考虑，应该做一下

为了实现需求
加入了moment，modal等功能


6.22
在review列表中增加了status，用户可以进行更多的交互。

现在有点困难。发现少个东西
1）缺少state，还有setState之后，更新整个dom的机制。跟随者，缺少cache component的功能。
这些缺失让维护复杂状态变得非常困难。
我觉得，先把基础的功能补上，也就是更新功能。
然后将后续的任务，放到react去解决。
这个项目主要是为了尝试
1）redux
2）原生dom，表单提交等功能。

我其实比较担心烂尾，但是目前缺失不好维护下去。我觉得应该先去从react的角度，重新思考一下。然后想办法，把state的问题解决
掉。

现在让我解决的话，我的想法只能是，分离出组件，维护好生命周期和state。但是这个解决方案我不是非常满意。

其实现在是有矛盾的。一方面有很多需求，另外一方面，我的确用这套技术栈不好直接迭代上去。
所以现在的思路就是，这个用来防守。react用来进攻。后台也要照顾好。