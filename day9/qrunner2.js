
function QueueRunner(f){
    let pause = false;
    let running = false;
    let list = [];
    
    function go(){
        if (!pause && list.length !==0){
            const temp = list.shift();
            f(temp.data,temp.onFinish);
            go();
        }
    }
    return {
        push:(data,onFinish)=>{
            list.push({data:data, onFinish: onFinish});
            go(data,onFinish);

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

var
    q = QueueRunner((data,onFinish)=>{
        console.log('start');
        console.log(data);
        onFinish();
        console.log('endd');
        
    });
setTimeout(() => {
    q.push({data:'vasya'},()=>{
    console.log('text1');
});
}, 1000);

setTimeout(() => {
    q.push({data:'petya'},()=>{
    console.log('text2');
});
}, 2000);
setTimeout(() => {
    q.pause();
}, 2500);
setTimeout(() => {
  q.push({data:'grisha'},()=>{
    console.log('text3');
});  
}, 3000);

setTimeout(() => {
    q.push({data:'dima'},()=>{
    console.log('text4');
});
}, 4000);

console.log(111);