import * as THREE from "three";
import './App.css'
import React, { useState, useRef , useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrthographicCamera, Environment, OrbitControls, TransformControls, useCursor , useGLTF} from '@react-three/drei'
import { Leva, folder, useControls } from 'leva';
import AppNavbar from './components/Navbar'
import Buttons from './components/AddObjects';
import Toggles from "./components/Toggles";



function App() {
  
  const orbitControlsRef = useRef();

  const [gridView, setgridView] = useState(true);
  const [axesView, setaxesView] = useState(true);
  const [camView, setcamView] = useState(false);
  const [camPosition, setcamPosition] = useState([0, 0, 10]);
  const [PrevcamPosition] = useState(new THREE.Vector3(0, 0, 0));

  const updateGridView = (updateGridView) => {
    setgridView(updateGridView);
    console.log(orbitControlsRef.current.object.position)
    console.log(orbitControlsRef.current.target)
  }
  const updateAxesView = (updateAxesView) => {
    setaxesView(updateAxesView);
  }
  const updateCamView = (updateCamView) => {
    setcamView(updateCamView);
    console.log(camPosition)
    if(!updateCamView){
      orbitControlsRef.current.object.position.copy(PrevcamPosition)
      orbitControlsRef.current.object.position.set(camPosition[0], camPosition[1], camPosition[2])
    } else if(updateCamView) {
      PrevcamPosition.copy(orbitControlsRef.current.object.position)
    } 
  }
  const updateCamPosition = (updateCamPosition) => {
    // orbitControlsRef.current.target.copy(updateCamPosition)
    setcamPosition(updateCamPosition)
    console.log(updateCamPosition)
  }


  const updateFunctions = {
    updateGridView,
    updateAxesView,
    updateCamView,
    updateCamPosition
  }




  const [shapesOnCanvas, setShapesOnCanvas] = useState([]);
  const meshRefs = useRef([]);
  const transformRef = useRef();
  const [target, setTarget] = useState(null);
  const [positionState, setPositionState] = useState([10, 20, 30]);  
  const { mode, scale, rotation, position, color } = useControls({
    Transform: folder({
      mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] },
      position: positionState,
      rotation: [0, 0, 0],
      scale: [0, 0, 0],
    }),
    Material: folder({
      color: { value: '#ff9621' }
    })
    
  });


  const addShape = (shape) => {    
    // console.log(shape);

    const NewShape = {
        type: shape,
        id: shapesOnCanvas.length,
        position: [0,0.5,0],
    };

    setShapesOnCanvas((prevShap) => [...prevShap, NewShape]);
  }

  const { nodes } = useGLTF('/Models.glb')
  
  const allShapes= {
    Cube: new THREE.BoxGeometry(1, 1, 1),
    Sphere: new THREE.SphereGeometry(1, 32, 32),
    Cylinder: new THREE.CylinderGeometry(1, 1, 1, 32),
    Cone: new THREE.ConeGeometry(1, 1, 32),
    wallOne: nodes.wallOne.geometry,
    wallTwo: nodes.wallTwo.geometry,
    wallThree: nodes.wallThree.geometry,
    wallFour: nodes.wallFour.geometry,
    Door: nodes.Door.geometry,
    Door2: nodes.Door2.geometry,
    Door3: nodes.Door3.geometry,
    Window: nodes.Window.geometry,
    Window2: nodes.Window2.geometry,
    Window3: nodes.Window3.geometry,
  }

  // const controls = transformRef.current

  //   if(controls)
  //   {
  //     // setPositionState([...controls.object.position])
  //     controls.addEventListener('change', () => {
  //       // console.log(controls.object.position)
  //       const newposition = [controls.object.position.x, controls.object.position.y, controls.object.position.z]
  //       console.log(newposition)
  //       console.log(controls)
  //       setPositionState(newposition)
  //     })
  //   } 
    
  useEffect(() => {
  
    if(target){
      console.log(Object.keys(nodes))
      target.material.color.set(color)
    }
  }, [color], []);



  return (
    <div className='App'>
      <AppNavbar />
      <Buttons addShape={addShape}/> 
      <Toggles updateFunctions={updateFunctions}/>

      
      <Canvas shadows onPointerMissed={() => setTarget(null)}>
        <PerspectiveCamera position={[3,3,3]} fov={120} makeDefault={!camView} />
        <OrthographicCamera position={camPosition} zoom={170} makeDefault={camView} />
        <ambientLight intensity={1} />
        {gridView ? <gridHelper args={[20, 20]} position={[0, -0, 0]} /> : null}
        {axesView ? <axesHelper args={[4]} /> : null}
        <Environment preset="city" />
        {shapesOnCanvas.map((shape, index) => (
          // console.log(allShapes[shape.type]),
          <mesh geometry={allShapes[shape.type]} receiveShadow castShadow key={shape.id} rotation={[ 0, 0, 0]} position={shape.position} ref={(meshRef) => { meshRefs.current[index] = meshRef; }} onClick={() => {setTarget(meshRefs.current[index]);}}>
            <meshStandardMaterial color={"#909090"}/>
          </mesh> 
        ))}
          {target && <TransformControls ref={transformRef} object={target} mode={mode} size={.5}/>}

        <OrbitControls ref={orbitControlsRef} enableRotate={!camView} makeDefault/>
      </Canvas>
    </div>
  )
}

export default App
