import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import './Topbar.css'
import instance from '../axios'
import Map from './Map'


export default function Topbar() {
    const [data, setData] = useState([])
    const [tdata, setTData] = useState([])
    const [runningState, setRunningState] = useState([])
    const [stoppedState, setStoppedState] = useState([])
    const [openedMap, setOpendMap] = useState([]);
    const [inputString, setInput] = useState('');
    const ref = useRef();
    const startHandler = (e) => {
        ref.current?.classList.remove("active");
        e.target.classList.add('active');
        ref.current = e.target;
      };
    const onChangeHandler = (e) =>{
        const string = e.target.value.toUpperCase();
        setInput(string);
    }
    useEffect(() => {
        let stoppedList = []
        let runningList = []
        instance.get('/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint').then((data) => {
            setData(data?.data?.data);
            setTData(data?.data?.data);
            data?.data?.data?.forEach((d) => {
                if (d.lastRunningState?.truckRunningState === 1) {
                    runningList.push(d)
                } else if (d.lastRunningState?.truckRunningState === 0) {
                    stoppedList.push(d)

                }
            })
            setRunningState(runningList)
            setStoppedState(stoppedList)
            setOpendMap(data?.data?.data)
        })
        

    }, [])
    useEffect(()=>{
        
    },[openedMap]);
    
    return (
        <div>
            <div className='container-fluid'>
                <Row ref={ref} className='pt-2 pb-1 main-container link-container'>
                    <Col sm onClick={(e) =>{setOpendMap(tdata);  startHandler(e)}}>
                        Total Trucks<br></br>
                        {tdata?.length}
                    </Col>
                    <Col sm
                       
                        onClick={(e) =>{ setOpendMap(runningState);  startHandler(e)}}
                    >
                        Running Trucks <br></br>
                        {runningState.length}</Col>
                    <Col sm onClick={(e) =>{ setOpendMap(stoppedState);  startHandler(e)}}>
                        Stopped Trucks <br></br>
                        {stoppedState.length}</Col>
                    <Col sm onClick={(e) =>{ setOpendMap(stoppedState);  startHandler(e)}}>Idle Trucks</Col>
                    <Col sm onClick={(e) =>{ setOpendMap(stoppedState);  startHandler(e)}}>Error Trucks</Col>
                    <Col>
                        <Form.Select>
                            <option>Default select</option>
                        </Form.Select>
                    </Col>
                </Row>
                <div>
                    <Row className='main-container'>
                        <Col xs={4} md={2} className='main-container left-scroll'>
                            <input
                                className="search"
                                type="search"
                                placeholder="Search trucks"
                                autoComplete="off"
                                onChange={onChangeHandler}
                            />
                            {(inputString ?  openedMap.filter((item)=>item.truckNumber.includes(inputString)) : openedMap).map((d, i) =>
                                (<Button variant="light" size="md" onClick={()=> {setOpendMap([d]) }} className='button-style m-1' key={i + 1}>{d.truckNumber}</Button>)
                            )}
                        </Col>
                        <Col xs={8} md={10} className='main-container height-map'>
                            <Map data={openedMap}/>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
