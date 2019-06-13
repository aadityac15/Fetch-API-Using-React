import React from 'react';
import ReactDOM from 'react-dom';
import './Fetch.css'
export default class FetchApi extends React.Component{
    constructor(props)
        {
            super(props);
            this.state = {
                students : [],
                searchText : '',
                filteredArray : []
            }

        }
    componentDidMount() {
        fetch('https://www.hatchways.io/api/assessment/students')
            .then(response => response.json())
            .then(data => this.setState({ students : data.students }));
            }
    
    searchFunction = () =>
            {
                const searchBox = document.getElementById('searchBox');
                const searchText = searchBox.value;
                if (searchText === '')
                    {
                        alert('Please Enter a Text');
                    }
                else
                    {                // searchText = searchText.lower();
                        this.setState({searchText : searchText}); 
                    }
                searchBox.value = '';


            }
    render()
        {
            console.log(this.state.students);
            const studentList = this.state.students.map((student) =>
            {
                return (
                    
                    <div className = "divClass">           
                    <table>         
                    <tr>
                    <td>
                    <img src = {student.pic} height = "80" width = "80" /><br />
                    </td>
                    <td className = 'classK'>
                    <span><b>Name:</b> {student.firstName} {student.lastName}</span>
                    <span><b>City: </b>  {student.city}</span>
                    <span><b>Company: </b>{student.company}</span>
                    <span><b>Email: </b> {student.email} </span>
                    <span><b>Skill: </b> {student.skill}</span>
                    </td>
                    </tr>
                    </table>   
                    </div>
                )
            })

            return (

                <div className = 'listClass'>
                <input type = "text" id = "searchBox" placeholder = "Search Criteria" /> 
                <button id = "searchButton" onClick = {this.searchFunction}>Filter</button>
                <h2>The Value in the SearchBox is {this.state.searchText}</h2>
                <ul>
                {studentList}                
                </ul>
                </div>
            )
        }




}