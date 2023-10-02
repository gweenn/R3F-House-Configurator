import * as THREE from "three";
import './App.css'
import React, { useState, useRef , useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrthographicCamera, Environment, OrbitControls, TransformControls, useCursor , useGLTF} from '@react-three/drei'
import AppNavbar from './components/Navbar'
import Buttons from './components/AddObjects';
import Toggles from "./components/Toggles";
import Interface from "./components/Interface";



function App() {
  
  const orbitControlsRef = useRef();

  const [gridView, setgridView] = useState(true);
  const [axesView, setaxesView] = useState(true);
  const [camView, setcamView] = useState(false);
  const [camPosition, setcamPosition] = useState([0, 0, 10]);
  const [changeMode, setchangeMode] = useState('translate');
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
    if(!updateCamView){
      orbitControlsRef.current.object.position.copy(PrevcamPosition)
      orbitControlsRef.current.object.position.set(camPosition[0], camPosition[1], camPosition[2])
    } else if(updateCamView) {
      PrevcamPosition.copy(orbitControlsRef.current.object.position)
    } 
  }
  const updateCamPosition = (updateCamPosition) => {
    setcamPosition(updateCamPosition)
  }

  const updateMode = (updateMode) => {
    setchangeMode(updateMode)
  }


  const updateFunctions = {
    updateGridView,
    updateAxesView,
    updateCamView,
    updateCamPosition,
    updateMode
  }


  const [shapesOnCanvas, setShapesOnCanvas] = useState([]);
  const meshRefs = useRef([]);
  const transformRef = useRef();
  const [target, setTarget] = useState(null);

  const addShape = (shape) => {

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



  const handleRoughnessChange = (newvalue) => {
    target.material.roughness = newvalue
  }
  const handleMetalnessChange = (newvalue) => {
    target.material.metalness = newvalue
  }
  const handleColorChange = (newvalue) => {
    target.material.color.set(newvalue)
  }
  const handlePositionChange = (newvalue) => {
    target.position.set(parseFloat(newvalue[0]),parseFloat(newvalue[1]),parseFloat(newvalue[2]))
  }
  const handleRotationChange = (newvalue) => {
    target.rotation.set(parseFloat(newvalue[0]),parseFloat(newvalue[1]),parseFloat(newvalue[2]))
  }
  const handleScaleChange = (newvalue) => {
    target.scale.set(parseFloat(newvalue[0]),parseFloat(newvalue[1]),parseFloat(newvalue[2]))
  }
  

  const [selectedObjectColor, setSelectedObjectColor] = useState('#909090');
  const [selectedObjectRoughness, setselectedObjectRoughness] = useState(1);
  const [selectedObjectMetalness, setselectedObjectMetalness] = useState(0);
  const [selectedObjectPosition, setSelectedObjectPosition] = useState([0, 0, 0]);
  const [selectedObjectRotation, setSelectedObjectRotation] = useState([0, 0, 0]);
  const [selectedObjectScale, setSelectedObjectScale] = useState([1, 1, 1]);

  const onObjectChange = () => {
    // console.log(target.position);
    setSelectedObjectPosition(target.position.toArray());
    setSelectedObjectRotation(target.rotation.toArray());
    setSelectedObjectScale(target.scale.toArray());
  };

  

  useEffect(() => {
    if(target){
      // target.position.set(2, 0.5, 0)
      // console.log(target.material.roughness)
      setselectedObjectRoughness(target.material.roughness)
      setselectedObjectMetalness(target.material.metalness)
      setSelectedObjectColor(target.material.color.getHexString());
      setSelectedObjectPosition(target.position.toArray());
      setSelectedObjectRotation(target.rotation.toArray());
      setSelectedObjectScale(target.scale.toArray());
    }

  }, [target],[]);
  

  return (
    <div className='App'>
      <AppNavbar />
      <Buttons addShape={addShape}/> 
      <Toggles updateFunctions={updateFunctions}/>
      {target && <Interface
        onRoughnessChange={handleRoughnessChange}
        setRoughness={selectedObjectRoughness}
        onMetalnessChange={handleMetalnessChange}
        setMetalness={selectedObjectMetalness}
        onColorChange={handleColorChange}
        setColor={selectedObjectColor}
        onPositionChange={handlePositionChange}
        onRotationChange={handleRotationChange}
        onScaleChange={handleScaleChange}
        positionMove={selectedObjectPosition}
        rotationMove={selectedObjectRotation}
        scaleMove={selectedObjectScale}
      />}

      
      <Canvas shadows onPointerMissed={() => setTarget(null)}>
        <PerspectiveCamera position={[3,3,3]} fov={120} makeDefault={!camView} />
        <OrthographicCamera position={camPosition} zoom={170} makeDefault={camView} />
        <ambientLight intensity={1} />
        {gridView ? <gridHelper args={[20, 20]} position={[0, -0, 0]} /> : null}
        {axesView ? <axesHelper args={[4]} /> : null}
        <Environment preset="city" />
        {shapesOnCanvas.map((shape, index) => (
          // console.log(allShapes[shape.type]),
          <mesh
            geometry={allShapes[shape.type]}
            key={shape.id}
            rotation={[ 0, 0, 0]}
            position={shape.position}
            ref={(meshRef) => { meshRefs.current[index] = meshRef; }}
            onClick={() => {setTarget(meshRefs.current[index]);}}
            >
            <meshStandardMaterial color={"#b3e6e6"}/>
          </mesh> 
        ))}
          {target && <TransformControls ref={transformRef} object={target} mode={changeMode} size={.5} onMouseUp={onObjectChange}/>}

        <OrbitControls ref={orbitControlsRef} enableRotate={!camView} makeDefault/>
      </Canvas>
    </div>
  )
}

export default App
