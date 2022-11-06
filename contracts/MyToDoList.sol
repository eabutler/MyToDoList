// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MyToDoList {
    uint public listCount = 0;
    

    struct Task {
        uint id;
        string taskContent;
        bool completion;
    }

    Task[] public taskList;

    constructor(string memory initialTask) {
        listCount ++;
        Task memory firstTask = Task ({
            id: listCount,
            taskContent: initialTask,
            completion: false
        });
        taskList.push(firstTask);
    }

    function addTask(string memory content) public {
        listCount ++;
        Task memory newTask = Task ({
            id: listCount,
            taskContent: content,
            completion: false
        });
        taskList.push(newTask);
    }

    function markCompleted(uint index) public {
        Task storage task = taskList[index];

        task.completion= true;
    }


}