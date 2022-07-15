const deg=6
var clock_digital="clock",timer_digit_counter=1,number=[0,0,0,0,0,0,0,0,0],timer_counter=true,
alarm_store=[0,0,0,0,0,0,0],alarm_second,alarm_minute,alarm_hour,alarm_counter=true,alarm_digit_counter=1,
timer_millisecond=number[2]*10+number[1],timer_second=number[4]*10+number[3],timer_minutes=number[6]*10+number[5],timer_hour=number[8]*10+number[7]     
button_creation_positive()
button_creation_negative()
stop_start("stop")
stop_start("start")
clock_or_digital_or_stopwatch_timer_alarm("a")
clock_or_digital_or_stopwatch_timer_alarm("c")
clock_or_digital_or_stopwatch_timer_alarm("d")
clock_or_digital_or_stopwatch_timer_alarm("s")
clock_or_digital_or_stopwatch_timer_alarm("t")

function clock(hours,minutes){
    hours-=5
    minutes-=30
    const hr=document.querySelector("#hr")
    const mn=document.querySelector("#mn")
    const se=document.querySelector("#se")
    
    const timeValue=setInterval(() => {
        let day=new Date()
        let hh=(day.getHours()+hours) * 30
        let mm=(day.getMinutes()+minutes) * deg 
        let ss=day.getSeconds() * deg

        hr.style.transform=`rotateZ(${hh+(mm/12)}deg)`
        mn.style.transform=`rotateZ(${mm}deg)`
        se.style.transform=`rotateZ(${ss}deg)` 

        document.addEventListener("click",e=> clearInterval(timeValue)) 
    }); 

}

function digital(hours,minutes){
    hours-=5
    minutes-=30
    let day=new Date()
    let am_pm="AM"
    let day_of_week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let month_names=["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    let month_check=[31,(day.getFullYear()%4==0 ?29 :28),31,30,31,30,31,31,30,31,30,31]
        
    document.getElementById("digital").style.visibility="visible"
    const timeValue=setInterval(() => {
        let day=new Date()
        let hh=(day.getHours()+hours),mm=(day.getMinutes()+minutes),ss=(day.getSeconds())
        let date=day.getDate(),month=day.getMonth(),weekday=day.getDay()
        if(mm<0){
            mm+=60
            hh--
        }
        if(hh>=24){
            hh-=24
            weekday++
            date++
        }
        if(hh<0){
            hh+=24
            weekday--
            date--
        }
        if(hh>=12){
            am_pm="PM"
            hh-=12
        }
        if(date>month_check[month]){
            month++
            date=1
        }
        if(date<=0){
            month--
            date=month_check[month]
        }
        weekday<0 ? weekday=6 : weekday
        weekday>6 ? weekday=0 : weekday
        document.getElementById("digital").innerHTML=`${pad(hh)}:${pad(mm)}:${pad(ss)} ${am_pm} <br> ${day_of_week[weekday]} ${month_names[month]} ${pad(date)}`
        document.addEventListener("click",e=> clearInterval(timeValue))  
    });
}

function button_creation_positive(){
    for(let i=0;i<=23;i++){
        const button=document.createElement("button")
        button.style.left=(i%2==0 ? "79.5%": "89%")
        button.style.top=`${7.5+(Math.floor(i/2)*7.5)}%`
        button.setAttribute("id",`positive-${i}`)
        attributes(button)
        button.setAttribute("onclick",`clicked(${(Math.floor(i/2))},${(i%2)*30},${i},"positive")`);
        button.innerHTML=`${(Math.floor(i/2))}:${pad((i%2)*30)} UTC`
        document.getElementById("positive-tz").appendChild(button) 
    }
}

function button_creation_negative(){
    for(let i=1;i<=24;i++){
        const button=document.createElement("button")
        button.style.left=(i%2==0 ? "3%": "12.5%")
        button.style.top=`${7.5+(Math.floor((i-1)/2)*7.5)}%`
        button.setAttribute("id",`negative-${i}`)
        attributes(button)
        button.setAttribute("onclick",`clicked(${-1*(Math.floor(i/2))},${(i%2)*-30},${i},"negative")`);
        button.innerHTML=`-${(Math.floor(i/2))}:${pad((i%2)*30)} UTC`
        document.getElementById("negative-tz").appendChild(button) 
    }
}

function attributes(button){
    button.style.position="fixed"
    button.style.width="8%"
    button.style.height="5%"
    button.style.backgroundColor="#0f5c83"
    button.style.borderColor="#0f5c83"
    button.style.color="white"
    button.style.fontWeight="bold"
    button.style.fontFamily="Helvetica"
    button.style.display="flex"
    button.style.justifyContent="center"
    button.style.alignItems="center";
}

function clicked(hour,minutes,index,p_or_n){
    none_red()
    document.getElementById(`${p_or_n}-${index}`).style.backgroundColor="#a72424"
    document.getElementById(`${p_or_n}-${index}`).style.borderColor="#a72424"
    clock_digital=="clock" ? clock(hour,minutes) : digital(hour,minutes)
}

function clock_or_digital_or_stopwatch_timer_alarm(a_c_d_s_t){
    const button=document.createElement("button")
    button.style.top=((a_c_d_s_t=="s" || a_c_d_s_t=="t" || a_c_d_s_t=="a") ? "90%" : "7.5%")
    button.style.left=((a_c_d_s_t=="s" || a_c_d_s_t=="c") ? "34.5%" : (a_c_d_s_t=="a" ? "45.5%" : "56.5%" ))
    button.setAttribute("id",`${a_c_d_s_t}_button`)
    attributes(button)
    a_c_d_s_t=="c" ? button.setAttribute("onclick",`clock_clicked()`) : 
    (a_c_d_s_t=="d" ? button.setAttribute("onclick",`digital_clicked()`) : 
    (a_c_d_s_t=="t" ? button.setAttribute("onclick",`timer_clicked()`) :
    (a_c_d_s_t=="a" ? button.setAttribute("onclick",`alarm_clicked()`) : button.setAttribute("onclick",`stopwatch_clicked()`) )))
    button.innerHTML=(a_c_d_s_t=="c" ? "CLOCK" : (a_c_d_s_t=="d" ? "DIGITAL" : (a_c_d_s_t=="t" ? "TIMER" : (a_c_d_s_t=="a" ? "ALARM" : "STOPWATCH")) ))
    document.getElementById("positive-tz").appendChild(button) 
}

function clock_clicked(){
    time_zone_visibility("visible")
    document.getElementById(`t_button`).disabled=false
    document.getElementById(`a_button`).disabled=false
    document.getElementById("start").style.visibility="hidden"
    document.getElementById("stop").style.visibility="hidden"
    clock_digital="clock"
    document.getElementById(`c_button`).style.backgroundColor="#a72424"
    document.getElementById(`c_button`).style.borderColor="#a72424"
    document.getElementById(`d_button`).style.backgroundColor="#0f5c83"
    document.getElementById(`d_button`).style.borderColor="#0f5c83"
    document.getElementById(`s_button`).style.backgroundColor="#0f5c83"
    document.getElementById(`s_button`).style.borderColor="#0f5c83"
    document.getElementById(`t_button`).style.backgroundColor="#0f5c83"
    document.getElementById(`t_button`).style.borderColor="#0f5c83"
    for(let i=1;i<=11;i++)
        document.getElementById(`${i}_number_button`).style.visibility="hidden"
    none_red()

    document.getElementById(`clock`).style.visibility="visible"
    document.getElementById(`clock`).style.width="350px"
    document.getElementById(`clock`).style.height="350px"
    
    document.getElementById(`digital`).style.visibility="hidden"
    document.getElementById(`digital`).style.width="0px"
    document.getElementById(`digital`).style.height="0px"
}

function digital_clicked(){
    time_zone_visibility("visible")
    document.getElementById("start").style.visibility="hidden"
    document.getElementById(`t_button`).disabled=false
    document.getElementById(`a_button`).disabled=false
    clock_digital="digital"
    document.getElementById("digital").innerHTML=""
    digital_display("d","s","t","a",680,280)
}

function stopwatch_clicked(){
    time_zone_visibility("hidden")    
    document.getElementById(`t_button`).disabled=false
    document.getElementById(`a_button`).disabled=false
    document.getElementById("stop").innerHTML="Stop"
    document.getElementById("stop").style.visibility="visible"
    document.getElementById("start").style.visibility="hidden"
    digital_display("s","d","t","a",680,320)
    let ms=0,ss=0,mm=0,hh=0,flag=true
    
    stopwatch_count=setInterval(()=> {
        flag ? ms++ : ms
        if(ms==100){
            ms=0
            ss+=1
        }
        if(ss==60){
            ss=0
            mm+=1
        }
        if(mm==60){
            mm=0
            hh+=1
        }
        document.getElementById("digital").innerHTML=`Stopwatch <br> ${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ms)}`
        
        document.getElementById("stop").addEventListener("click",e=> {
            document.getElementById("start").style.visibility="visible"
            document.getElementById("stop").style.visibility="hidden"
            flag=false })
        document.getElementById("start").addEventListener("click",e=> {
            document.getElementById("stop").style.visibility="visible"
            document.getElementById("start").style.visibility="hidden"
            flag=true })
        document.getElementById("d_button").addEventListener("click",e=> {
            document.getElementById("start").style.visibility="hidden"
            document.getElementById("stop").style.visibility="hidden"
            clearInterval(stopwatch_count) })
        document.getElementById("t_button").addEventListener("click",e=> {
                document.getElementById("stop").style.visibility="hidden"
                clearInterval(stopwatch_count) })  
        document.getElementById("a_button").addEventListener("click",e=> {
                document.getElementById("stop").style.visibility="hidden"
                clearInterval(stopwatch_count) })             
        document.getElementById("s_button").addEventListener("click",e=> {
            document.getElementById("stop").style.visibility="visible"
            document.getElementById("start").style.visibility="hidden"
            ms=0,ss=0,mm=0,hh=0,flag=true })
    },10)

}

function digital_display(index1,index2,index3,index4,width,height){
    document.getElementById(`${index1}_button`).style.backgroundColor="#a72424"
    document.getElementById(`${index1}_button`).style.borderColor="#a72424"
    document.getElementById(`${index2}_button`).style.backgroundColor="#0f5c83"
    document.getElementById(`${index2}_button`).style.borderColor="#0f5c83"
    document.getElementById(`${index3}_button`).style.backgroundColor="#0f5c83"
    document.getElementById(`${index3}_button`).style.borderColor="#0f5c83"
    document.getElementById(`${index4}_button`).style.backgroundColor="#0f5c83"
    document.getElementById(`${index4}_button`).style.borderColor="#0f5c83"
    document.getElementById(`c_button`).style.backgroundColor="#0f5c83"
    document.getElementById(`c_button`).style.borderColor="#0f5c83"
    none_red()

    document.getElementById(`digital`).style.visibility="visible"
    document.getElementById(`digital`).style.width=`${width}px`
    document.getElementById(`digital`).style.height=`${height}px`
    
    document.getElementById(`clock`).style.visibility="hidden"
    document.getElementById(`clock`).style.width="0px"
    document.getElementById(`clock`).style.height="0px"
}

function stop_start(index){
    const button=document.createElement("button")
    button.style.left=(index=="start" ? "28%": "67.5%")
    button.style.top="45%"
    attributes(button)
    button.style.width="5%"
    button.style.height="10%"
    button.setAttribute("id",index=="stop" ? "stop" : "start")
    button.innerHTML=index=="stop" ? "Stop" : "Start"
    button.style.backgroundColor="#a72424"
    button.style.borderColor="#a72424"
    button.style.visibility="hidden"
    document.getElementById("positive-tz").appendChild(button) 
}

function timer_clicked(){
    document.getElementById(`t_button`).disabled=true
    document.getElementById(`a_button`).disabled=false
    document.getElementById("stop").innerHTML="Stop"
    time_zone_visibility("hidden")    
    document.getElementById("start").style.visibility="visible"
    timer_counter=true,number=[0,0,0,0,0,0,0,0,0]
    digital_display("t","s","d","a",680,320)
    document.getElementById("digital").innerHTML=`Timer <br> ${number[8]}${number[7]}:${number[6]}${number[5]}:${number[4]}${number[3]}:${number[2]}${number[1]}`      
    
    for(let i=1;i<=11;i++)
        numbers(i,"timer")
    
    document.addEventListener("keydown",e=>{
        for(let i=0;i<=9;i++){
            if(e.key==`${i}`)
                add_time(i,"timer")    
        }
        if(e.keyCode==8)
            remove_time("timer")            
    })

    document.getElementById("start").addEventListener("click",e=>{
        timer_counter=false
        document.getElementById("stop").innerHTML="Stop"
        document.getElementById("start").style.visibility="hidden"
        document.getElementById("stop").style.visibility="visible"
        if(timer_millisecond>=100){
            timer_millisecond-=100
            timer_second++
        }
        if(timer_second>=60){
            timer_second-=60
            timer_minutes++
        }
        if(timer_minutes>=60){
            timer_minutes-=60
            timer_hour++
        }         
        timer_count=setInterval(()=> {        
            timer_millisecond--
            if(timer_millisecond<0){
                timer_millisecond+=100
                timer_second--
            }
            if(timer_second<0){
                timer_second+=60
                timer_minutes--
            }
            if(timer_minutes<0){
                timer_minutes=60
                timer_hour--
            }
            document.getElementById("digital").innerHTML=`Timer <br> ${pad(timer_hour)}:${pad(timer_minutes)}:${pad(timer_second)}:${pad(timer_millisecond)}`
            if(timer_hour<0){
                document.getElementById("stop").style.visibility="hidden"
                document.getElementById("digital").innerHTML=("TIME UP")
                clearInterval(timer_count)
            }
            
            document.getElementById("stop").addEventListener("click",e=> {
                document.getElementById("start").style.visibility="visible"
                document.getElementById("stop").style.visibility="hidden"
                clearInterval(timer_count) })
            document.getElementById("start").addEventListener("click",e=> {
                document.getElementById("stop").style.visibility="visible"
                document.getElementById("start").style.visibility="hidden" })
            document.getElementById("d_button").addEventListener("click",e=> {
                document.getElementById("stop").style.visibility="hidden"
                clearInterval(timer_count) })
            document.getElementById("s_button").addEventListener("click",e=> {
                document.getElementById("start").style.visibility="hidden"
                clearInterval(timer_count) })
            document.getElementById("a_button").addEventListener("click",e=> {
                document.getElementById("stop").style.visibility="hidden"
                clearInterval(stopwatch_count) })    
            document.getElementById("c_button").addEventListener("click",e=> {
                document.getElementById("start").style.visibility="hidden"
                clearInterval(timer_count) })    
        },10)
    })
}

function add_time(i,alarm_timer){
    if(alarm_timer=="timer" ? timer_counter : alarm_counter){
        let c=alarm_timer=="timer" ? timer_digit_counter : alarm_digit_counter
        while(c>=2)
            alarm_timer=="timer" ? number[c]=number[--c] : alarm_store[c]=alarm_store[--c]
        alarm_timer=="timer" ? number[1]=i : alarm_store[1]=i
        alarm_timer=="timer" ? timer_digit_counter++ : alarm_digit_counter++
        if(alarm_timer=="timer"){
            document.getElementById("digital").innerHTML=`Timer <br> ${number[8]}${number[7]}:${number[6]}${number[5]}:${number[4]}${number[3]}:${number[2]}${number[1]}`
            timer_millisecond=number[2]*10+number[1],timer_second=number[4]*10+number[3],timer_minutes=number[6]*10+number[5],timer_hour=number[8]*10+number[7]     
        }
        else{
            document.getElementById("digital").innerHTML=`Alarm <br> ${alarm_store[6]}${alarm_store[5]}:${alarm_store[4]}${alarm_store[3]}:${alarm_store[2]}${alarm_store[1]}`      
            alarm_second=alarm_store[2]*10+alarm_store[1],alarm_minute=alarm_store[4]*10+alarm_store[3],alarm_hour=alarm_store[6]*10+alarm_store[5]
        }
    }
}

function remove_time(alarm_timer){
    if(alarm_timer=="timer" ? timer_counter : alarm_counter){
        let c=1
        while(c< (alarm_timer=="timer" ? timer_digit_counter : alarm_digit_counter))
            alarm_timer=="timer" ? number[c]=number[++c] : alarm_store[c]=alarm_store[++c]
        alarm_timer=="timer" ? number[timer_digit_counter]=0 : alarm_store[alarm_digit_counter]=0   
        alarm_timer=="timer" ? timer_digit_counter-- : alarm_digit_counter--
        if(alarm_timer=="timer"){
            document.getElementById("digital").innerHTML=`Timer <br> ${number[8]}${number[7]}:${number[6]}${number[5]}:${number[4]}${number[3]}:${number[2]}${number[1]}`
            timer_millisecond=number[2]*10+number[1],timer_second=number[4]*10+number[3],timer_minutes=number[6]*10+number[5],timer_hour=number[8]*10+number[7]     
        }
        else{
            document.getElementById("digital").innerHTML=`Alarm <br> ${alarm_store[6]}${alarm_store[5]}:${alarm_store[4]}${alarm_store[3]}:${alarm_store[2]}${alarm_store[1]}`      
            alarm_second=alarm_store[2]*10+alarm_store[1],alarm_minute=alarm_store[4]*10+alarm_store[3],alarm_hour=alarm_store[6]*10+alarm_store[5]
        }
    }
}

function numbers(i,alarm_timer){
    const button=document.createElement("button")
    button.style.top="510px"
    button.style.left=`${305+(i*60)}px`
    attributes(button)
    button.setAttribute("id",`${i}_number_button`)
    i==10 ? i=0 : i
    if(i==11){ 
        i="X"
        button.style.backgroundColor="#a72424"
        button.style.borderColor="#a72424"
        button.setAttribute("onclick",alarm_timer=="timer" ? `remove_time("timer")` : `remove_time("alarm")`)        
    }
    else
        button.setAttribute("onclick",alarm_timer=="timer" ? `add_time(${i},"timer")` : `add_time(${i},"alarm")`)
    button.style.height="30px"
    button.style.width="50px"
    button.innerHTML=i
    document.getElementById("others").appendChild(button)
} 

function none_red(){
    for(let i=1;i<=24;i++){
        document.getElementById(`positive-${i-1}`).style.backgroundColor="#0f5c83"
        document.getElementById(`positive-${i-1}`).style.borderColor="#0f5c83"
        document.getElementById(`negative-${i}`).style.backgroundColor="#0f5c83"
        document.getElementById(`negative-${i}`).style.borderColor="#0f5c83"
    }
}

function time_zone_visibility(v){
    for(let i=0;i<=23;i++){
        document.getElementById(`positive-${i}`).style.visibility=v
        document.getElementById(`negative-${i+1}`).style.visibility=v
    }
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function alarm_clicked(){
    document.getElementById(`a_button`).disabled=true
    document.getElementById(`t_button`).disabled=false
    time_zone_visibility("hidden")    
    alarm_store=[0,0,0,0,0,0,0]
    document.getElementById("start").style.visibility="visible"
    document.getElementById("stop").style.visibility="hidden"
    document.getElementById("stop").innerHTML="Reset"
    digital_display("a","t","s","d",680,320)
    document.getElementById("digital").innerHTML=`Alarm <br> ${alarm_store[6]}${alarm_store[5]}:${alarm_store[4]}${alarm_store[3]}:${alarm_store[2]}${alarm_store[1]}`      
    for(let i=1;i<=11;i++)
        numbers(i,"alarm")
    
    document.addEventListener("keydown",e=>{
        for(let i=0;i<=9;i++){
            if(e.key==`${i}`)
                add_time(i,"alarm")    
        }
        if(e.keyCode==8)
            remove_time("alarm")            
    })    

    document.getElementById("start").addEventListener("click",e=>{
        alarm_counter=false
        document.getElementById("start").style.visibility="hidden"
        document.getElementById("stop").style.visibility="visible"
        if(alarm_second>=60){
            alarm_second-=60
            alarm_minute++
        }
        if(alarm_minute>=60){
            alarm_minute-=60
            alarm_hour++
        }
        document.getElementById("digital").innerHTML=`Alarm <br> ${pad(alarm_hour)}:${pad(alarm_minute)}:${pad(alarm_second)}`      
        if(alarm_hour>24)
            document.getElementById("digital").innerHTML=("Time <br> Exceded")
        else{
            const alarm_count=setInterval(() => {    
                let day=new Date()
                if((day.getHours()==alarm_hour)&&(day.getMinutes()==alarm_minute)&&(day.getSeconds()==alarm_second)){
                    document.getElementById("digital").innerHTML=("Time up")
                    clearInterval(alarm_count)
                } 
                document.getElementById("stop").addEventListener("click",()=> {        
                    alarm_store=[0,0,0,0,0,0,0]
                    clearInterval(alarm_count) 
                })
            })
        }  
    })
}
