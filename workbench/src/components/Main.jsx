import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar.jsx';
import BDDEditor from './BDDEditor';
import BDDVisualisor from './BDDVisualisor';
import 'bootstrap/dist/css/bootstrap.min.css';
import AjaxRequest from './AjaxRequest.jsx';


function Main() {
    const [content, setContent] = useState("struct BMP {\n\tBitmapFileHeader fileheader;\n\tDIBHeader dibheader;\n}\nstruct BitmapFileHeader {\n\tuint32 fileoffsettopixelarray;\n}\nstruct DIBHeader {\n\tuint32 dibheadersize;\n}\ndocument BMPDocument {\n\tBMP bmp;\n}");
    const [graph, setGraph] = useState({ nodes: [], edges: [] })

    const sendToBackend = async () => {
        setGraph({ nodes: [], edges: [] });
        await AjaxRequest.bddVisRequest(content)
            .then(function (response) {
                setGraph(response.body);
                console.log(graph)
            })
    }

    const onSetContentChange = (newContentVal) => {
        setContent(newContentVal);
    }

    return (
        <Row>
            <Col xs={2}>
                <NavigationBar></NavigationBar>
            </Col>
            <Col style={{ backgroundColor: '#0c3451' }}>
                <BDDEditor 
                    changeContent={onSetContentChange}
                    content={content} 
                />
                <Button
                    variant="light"
                    onClick={e => sendToBackend(e)}
                >Run</Button>
            </Col>
            <Col>
                <BDDVisualisor
                    bddGraph={graph}
                />
            </Col>
        </Row>

    );

}

export default Main;