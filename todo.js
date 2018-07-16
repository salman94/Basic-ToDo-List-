
// if edicheck is 0 then we are adding new task if editcheck is 1 then we are updating an existing task.
var editcheck=0;
// to update the existing task we use editID which point to the current task.
var editID;
// to get the task array from the local storage
function getTaskArr(){
	var taskArr = new Array;
	var taskstr = localStorage.getItem('todo');
	if(taskstr!=null)
	{
		taskArr = JSON.parse(taskstr);
	}
	return taskArr;
}

// to add a task in task list

function addTask(){
	var taskArr = getTaskArr();
	if(editcheck==0){				// since editcheck is 0 so it is a new task
			var inputTask=document.getElementById("taskAdd").value;
			// to retain placeholder
			document.getElementById("taskAdd").value="";
			if(inputTask==""){
				alert("put some task into task field");
				return;
			}
			taskArr.push(inputTask);
			localStorage.setItem('todo', JSON.stringify(taskArr));
			showTaskList();
	}
	else{						// for edicheck = 1 this will update existing task
		
		str=document.getElementById("taskAdd").value;
		taskArr[editID]=str;
		document.getElementById("taskAdd").value="";
		
		localStorage.setItem('todo', JSON.stringify(taskArr));
		showTaskList();
		editcheck=0;
	}	
}

// to display the content of list
function showTaskList(){
	var taskArr = getTaskArr();
	var len = taskArr.length;
	
	var list="";
	for(var i=0;i<len;i++){
		
		var editbutton='<button type="submit" style="margin-right:12px;float:right;" onclick="editTask('+i+')" id="'+i+'">'+
						'<i class="fa fa-edit" style="font-size:16px"></i>'+'</button>';
		var delbutton='<button type="submit" style="margin-right:12px;float:right;" onclick="deleteTask('+i+')" id="'+i+'">'+
						'<i class="fa fa-trash-o" style="font-size:16px"></i>'+'</button>';
		var str = taskArr[i];
		if(str[0]=='<'){
			list+="<li>"+"<ran>"+str+"</ran>"+'<input type="checkbox" id='+'"'+i+'"'+ 'onclick="newElement('+i+')'+'"'+
			'style="float:right;display:block;width:20px;height:18px;" checked>'+delbutton+editbutton+"</li>";
		}
		else{
			list+="<li>"+"<ran>"+str+"</ran>"+'<input type="checkbox" id='+'"'+i+'"'+ 'onclick="newElement('+i+')'+'"'+
			'style="float:right;display:block;width:20px;height:18px;" >'+delbutton+editbutton+"</li>";
		}
		
	}
	document.getElementById("task").innerHTML=list;
}

// to mark or unmark completed task 

function newElement(id){
	var checkBox=document.getElementById(""+id);
	var taskArr = getTaskArr();
	
	if(checkBox.checked==true){
		var str=taskArr[id];
		str="<s>"+str+"</s>";	
		taskArr[id] = str;
		localStorage.setItem('todo', JSON.stringify(taskArr));
		
		showTaskList();
	
	}
	else{
		var str=taskArr[id];
		
		var temp="";
		for(var i=0;i<str.length;i++){
			if(str[i]=='<' && str[i+1]=='s')
				i=i+2;
			else if(str[i]=='<' && str[i+1]=='/')
				i=i+3;
			else
				temp = temp+str[i];
		}
		taskArr[id] = temp;
		localStorage.setItem('todo', JSON.stringify(taskArr));
		showTaskList();
	}
}




// to delete completed task

function deleteTask( iid){
	var taskArr = getTaskArr();
	taskArr.splice(iid,1);
	localStorage.setItem('todo', JSON.stringify(taskArr));
	showTaskList();
}

// to edit given task

function editTask(edit1){
	editcheck=1;
	var taskArr = getTaskArr();
	var str=taskArr[edit1];
	var temp="";
	// code to unmark a marked task then edit it
	for(var i=0;i<str.length;i++){
		if(str[i]=='<' && str[i+1]=='s')
				i=i+2;
			else if(str[i]=='<' && str[i+1]=='/')
				i=i+3;
			else
				temp = temp+str[i];
		}
	taskArr[edit1] = temp;
	localStorage.setItem('todo', JSON.stringify(taskArr));
	document.getElementById("taskAdd").value=temp;
	editID=edit1;
	
}

// function to search for specific task

function searchTask(){
	var input, filter, ul, li, a;
	input = document.getElementById("onsearch");
	filter = input.value.toUpperCase();
	ul = document.getElementById("task");
	li = ul.getElementsByTagName("li");
	for(var i = 0; i<li.length; i++){
		a=li[i].getElementsByTagName("ran")[0];
		
		if(a.innerHTML.toUpperCase().indexOf(filter)>-1){
			li[i].style.display="";
		}
		else{
			li[i].style.display="none";
		}
	}
}





