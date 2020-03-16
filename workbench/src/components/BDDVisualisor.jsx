import React from 'react';
import Graph from 'vis-react';

function BDDVisualisor(props) {

    if (props.bddGraph === null){
        console.log("Graph Empty");
    }
    else{
        var graph = props.bddGraph;
    }
    /*{
        nodes: [
            { id: 257, label: 'BitmapFileHeader:fileheader', shape: 'dot' },
            { id: 258, label: 'DIBHeader:dibheader', shape: 'dot' },
            { id: 1, label: 'BMP', shape: 'dot' },
            { id: 513, label: 'uint16:signature', shape: 'dot' },
            { id: 514, label: 'uint32:filesize', shape: 'dot' },
            { id: 515, label: 'uint16:reserved1', shape: 'dot' },
            { id: 516, label: 'uint16:reserved2', shape: 'dot' },
            { id: 517, label: 'uint32:fileoffsettopixelarray', shape: 'dot' },
            { id: 2, label: 'BitmapFileHeader', shape: 'dot' },
            { id: 769, label: 'uint32:dibheadersize', shape: 'dot' },
            { id: 3, label: 'DIBHeader', shape: 'dot' },
            { id: 1025, label: 'BMP:bmp', shape: 'dot' },
            { id: 4, label: 'BMPDocument', shape: 'dot' }
        ],
        edges: [
            { from: 257, to: 2 }, { from: 258, to: 3 }, { from: 1, to: 257 },
            { from: 1, to: 258 }, { from: 2, to: 513 }, { from: 2, to: 514 },
            { from: 2, to: 515 }, { from: 2, to: 516 }, { from: 2, to: 517 },
            { from: 3, to: 769 }, { from: 1025, to: 1 }, { from: 4, to: 1025 }
        ]

    }*/

    return (
        <>
            <h1 className="mt-3">BDD Visualiser</h1>
            <Graph
                graph={graph}
                style={{ height: '100%' }}
            />
        </>
    );


}

export default BDDVisualisor;