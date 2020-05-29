简答题
1.描述引用计数的工作原理和优缺点。
答：
在内部通过一个引用计数器，来维护当前对象的引用数，从而判断该对象的引用数值是否为0来判断他是不是一个垃圾对象。 当该值为0时，GC就开始工作，将其所在的对象空间进行回收和释放再使用。


2.描述标记整理算法的工作流程。
答：
第一阶段：找到所有可达对象，如果说涉及到引用的层次关系，那么会进行递归的进行查找。找完以后将这些可达对象进行标记。
第二阶段：在清除之前会做整理操作，移动对象的位置，能让他们在地址上产生连续。
第三阶段：开始做清除，找到那些没有去做标记的对象进行清除，然后把第一阶段所做的标记进行抹除。这样就完成了一次垃圾回收。


3.描述V8中新生代存储区垃圾回收的流程
答：
回收过程采用复制算法和标记整理算法，新生代内存区也分为两个等大小的空间一个是From一个是To，使用空间为From，空闲空间为To。活动对象存储于From空间，当From空间使用到一定程度后会触发GC操作，这个时候会进行标记整理算法，之后将活动对象拷贝至To空间，然后将From的空间完全释放掉，完成空间的对调，这样就完成了新生代对象的回收操作。
回收细节说明
如果在拷贝时发现某一个变量对象所占用的空间在老生代对象当中也会出现。这样就会进行晋升操作，晋升操作是指将新生代对象移动至老生代进行存储。
哪些对象进行晋升操作？
1、在一轮GC操作过后还存在的新生代对象拷贝至老生代当中，进行一个存储操作。
2、在拷贝的过程中发现To的空间使用率超过25%，那么也需要将这一次的活动对象都移动至老生代进行存储。


4.描述增量标记算法在何时使用，及工作原理。
答：
将当前一整段的垃圾回收操作拆分成多个小步，组合着完成当前整个回收，这样做的好处可以实现垃圾回收和程序执行交替着完成，这样所带来的的时间消耗更加合理。
当程序执行时触发了GC操作，那就会进行遍历对象进行标记，标记过程不用一下完成，先只完成直接可达对象的标记，然后让程序继续执行一段时间，然后再停下来让GC进行第二步的标记操作，如此交替执行。当标记完成以后就让程序停下来
等待GC完成清除操作。当清除操作执行完后程序会继续执行。