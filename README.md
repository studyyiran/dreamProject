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