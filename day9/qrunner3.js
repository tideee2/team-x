
function QueueRunner(f){
    let pause = false;
    let working = false;
    let list = [];
    
    function go(data){
        list[0].onFinish(data);
        list.shift();
        if(!pause && list.length!==0){
           // console.log('fff');
            f(list[0],go);
        }
        else{
            working = false;
        }   
    }
    return {
        push:(x)=>{
            list.push(x);
            //go(data,onFinish);
            if (!working){
                working = true;
                f(x,go);
            }
            
        },
        pause:()=>{
            pause = true;
            console.log('---paused---');
        },
        resume:()=>{
            pause = false;
            console.log('resume');
            if (list.length == 0){
                console.log('queue is empty')
            }
            else go();
        },
        cleanUp:()=>{
            while(!list.length == 0){
                console.log('Cancelled');
                list.shift();
            }
            
            this.t = list;  
        },
        t : list
    }
}

var q = QueueRunner((data,onFinish)=>{
				// BUG:
        // Why should I use data.data.id? 
        // on `data` I receive only what user passes to data on q.push except a whole entry
    		setTimeout(() => {
        	console.log(data.data.id, data.data.name);
          onFinish();
        }, data.data.timeout)
    });
    
    var onFinish = (name) => {
    	return () => console.log('Finished: ' + name);
    };

console.log('start');

q.push({ data: { id: 1, name: 'Text 1', timeout: 2000 }, onFinish: onFinish('Text1')});

q.push({ data: { id: 2, name: 'Text 2', timeout: 3000 }, onFinish: onFinish('Text2')});

q.push({ data: { id: 3, name: 'Text 3', timeout: 500 }, onFinish: onFinish('Text3')});

q.push({ data: { id: 4, name: 'Text 4', timeout: 1500 }, onFinish: onFinish('Text4')});

console.log('Finished');

