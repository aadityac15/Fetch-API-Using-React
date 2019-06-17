import React from 'react';
import ReactDOM from 'react-dom';
import './Fetch.css'
export default class FetchApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            searchText: '',
            filteredStudents: [],
            temp: true,
            grades: [],
            tags: [],
            tagObject: {},
            filteredTagStudents : []

        }

    }

    showScores = (id) => {
        let grades = this.state.grades;
        this.setState({
            grades: [...grades, id]
        })


    }

    componentDidMount = () => {
        fetch('https://www.hatchways.io/api/assessment/students')
            .then(response => response.json())
            .then(data => this.setState({ students: data.students }));

    }

    calculateAverage = (array) => {
        let avg = 0;

        for (let i = 0; i < array.length; i++) {
            avg += parseFloat(array[i]);
        }
        return avg / array.length;
    }
    searchFunction = () => {
        //console.log(this.state.temp);
        const searchBox = document.getElementById('searchBox');
        const searchText = searchBox.value;

        this.setState({ searchText: searchText });

        // searchText = searchText.lower();
        let searchT = searchText.toLowerCase();

        const matchingFunction = (students, index) => {
            let firstName = students.firstName.toLowerCase();
            let lastName = students.lastName.toLowerCase();
            // console.log(firstName.includes(searchT) || lastName.includes(searchT))
            return (
                firstName.includes(searchT) || lastName.includes(searchT)
            );
        }

        const filteredStudents = this.state.students.filter(matchingFunction)
        // console.log('k=',filteredStudents)

        this.setState({ filteredStudents: filteredStudents });

        if (searchT !== '') {
            this.setState({ temp: false });
        } else {
            this.setState({ temp: true });
        }
    }

    hideScores = (id) => {
        let reducedArray = this.state.grades.filter((value, index) => {
            return (value !== id);
        }
        );

        this.setState({ grades: reducedArray })

    }

    gradeList = (array) => {
        const gradeList = array.map((grade, index) =>

            (
                <li>
                    Test {index + 1} : {grade}%
                    </li>
            ))

        return <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }}>{gradeList}</ul>

    }
    addTags = (e, id) => {
        if (e.key === 'Enter') {
            let tagValue = e.target.value;
            let tagObject = this.state.tagObject;

            if (Object.keys(tagObject).includes(id)) {
                tagObject[id].push(tagValue);
            }
            else {
                tagObject[id] = [tagValue];
            }
            // let newtags = this.state.tags;
            // this.setState({
            //     tags : [...newtags,tagValue]
            // })

            this.setState({
                tagObject
            })

            

            e.target.value = '';
            // const displayTags = this.displayTags;
        }
    }


    searchTags = (e) =>
        {
            let tagText = e.target.value;
                
            let searchT = tagText.toLowerCase();
           
        const matchingFunction = (students, index) => {
            let tagNameArray = this.state.tagObject[students.id];
            if (tagNameArray)
            {
            for(let i = 0 ; i<tagNameArray.length;i++)
                {
                    const tagName = tagNameArray[i].toLowerCase();
                  
                if (
                    tagName.includes(searchT)
                )
                return true

                }
            }
            return false;
        }
        
        const filteredStudents = this.state.students.filter(matchingFunction)
      

        this.setState({ filteredStudents});

        if (searchT !== '') {
            this.setState({ temp: false });
        } else {
            this.setState({ temp: true });
        }
    }
        
        
        
        
        
        
        





    displayArrays = (id) =>
    {   
        if (Object.keys(this.state.tagObject).includes(id))
        {
            
        let displayArray = this.state.tagObject[id].map((tags) =>
        {
            return (
                
                <span class ='displayTags'>{tags}</span>
                    
                
            )


            }  
        )
        return displayArray;
        console.log(displayArray)
    }
    
    
    }
    



    render() {
        console.log(this.state);
        // console.log(this.d)





        const studentList = this.state.students.map((student) => {
            return (
                <div className="divClass" key={student.id}>
                    <table>
                        <tr>
                            <td>
                                <img src={student.pic} alt="No Photos" height="80" width="80" />
                            </td>
                            <td className="classK">
                                <h2 className='h1tag'>{student.firstName} {student.lastName}</h2>
                                <span>City: {student.city}</span>
                                <span>Company: {student.company}</span>
                                <span>Email: {student.email} </span>
                                <span>Skill: {student.skill}</span>
                                <span>Grades : {`${this.calculateAverage(student.grades)}%`}</span>
                            </td>
                            <td className="plusPlus">
                                {
                                    this.state.grades.includes(student.id) ?
                                        <i class="fa fa-minus" onClick={() => this.hideScores(student.id)}></i>
                                        :
                                        <i class="fa fa-plus" onClick={() => { this.showScores(student.id) }}></i>
                                }
                            </td>
                        </tr>
                        {
                            this.state.grades.includes(student.id) ?
                                <>
                                    <tr style={{ borderTop: '2px lightgrey solid' }}>
                                        <td>
                                        </td>
                                        <td className='classK' >
                                            {this.gradeList(student.grades)}
                                        </td>

                                    </tr>

                                    <tr>
                                        <td />
                                        <td className='classK'>
                                            <div className = "divTags">{this.displayArrays(student.id)}</div>
                                        </td>
                                        <td />
                                    </tr>
                                    <tr>
                                        <td />
                                        <td className='classK'>
                                            <input type="text" placeholder="Add a tag" onKeyDown={(e) => { this.addTags(e, student.id) }} />
                                        </td>

                                    </tr>

                                </>
                                : null
                        }

                    </table>
                </div>
            )
        })

        const filteredStudentList = this.state.filteredStudents.map((student) => {
            return (
                <div className="divClass" key={student.id}>
                    <table>
                        <tr>
                            <td>
                                <img src={student.pic} alt="No photos" height="100" width="100" />
                            </td>
                            <td className="classK">
                                <h2 className='h1tag'>{student.firstName} {student.lastName}</h2>
                                <span>Company: {student.company}</span>
                                <span>Email: {student.email} </span>
                                <span>Skill: {student.skill}</span>
                                <span>Grades : {`${this.calculateAverage(student.grades)}%`}</span>
                            </td>
                            <td className="plusPlus">
                                {
                                    this.state.grades.includes(student.id) ?
                                        <i class="fa fa-minus" onClick={() => this.hideScores(student.id)}></i>
                                        :
                                        <i class="fa fa-plus" onClick={() => { this.showScores(student.id) }}></i>
                                }
                            </td>
                        </tr>

                        {
                            this.state.grades.includes(student.id) ?
                                <>
                                    <tr style={{ borderTop: '2px lightgrey solid' }}>
                                        <td>
                                        </td>
                                        <td className='classK' >
                                            {this.gradeList(student.grades)}
                                        </td>

                                    </tr>
                                    <tr>
                                        <td />
                                        <td className='classK'>
                                        <div className = "divTags">{this.displayArrays(student.id)}</div>
                                        </td>
                                        <td />
                                    </tr>
                                    <tr>
                                        <td />
                                        <td className='classK'>
                                        <input type="text" placeholder="Add a tag" onKeyDown={(e) => { this.addTags(e, student.id) }} />
                                        </td>

                                    </tr>
                                    <tr>


                                    </tr>
                                </>
                                : null
                        }



                    </table>
                </div>
            )
        })
        return (
            <div style={{ width: '60%' }}>
            <div className='listClass'>
                        <input type="text" id="searchBox" placeholder="Search Criteria" onChange={this.searchFunction} />
                        <input type="text" className = "tagFilter" id="searchBox" placeholder="Search Tags" onChange={(e) =>{this.searchTags(e)}} />
                {this.state.temp ?
                   
                        <div className='innerListClass'>
                            <ul>
                                {studentList}
                            </ul>
                        </div>
                   
                    :
                   
                        <div className='innerListClass'>

                            <ul>
                                {filteredStudentList}
                            </ul>
                        </div>
                    

                }

                </div>
            </div>
        )
    }
}