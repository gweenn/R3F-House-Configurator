import { Canvas, useLoader } from '@react-three/fiber'
import {
  OrbitControls,
  CubeCamera,
  useGLTF,
  Environment, Caustics,
  AccumulativeShadows,
  MeshRefractionMaterial,
  RandomizedLight} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useState} from 'react'
import { RGBELoader } from 'three-stdlib'
import './App.css'
import * as THREE from 'three';

const metalMaterials = {
  silver: new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.1, color: '#f2f2f2' }),
  gold: new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.1, color: '#fff4b5' }),
  rose_gold: new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.1, color: '#ffded6' })
};

const stoneMaterials = {
  sapphire: new THREE.MeshStandardMaterial({ color: '#0F52BA' }),
  citrine: new THREE.MeshStandardMaterial({ color: '#E4D00A' }),
  opal: new THREE.MeshStandardMaterial({ color: '#A8C3BC' }),
  aquamarine: new THREE.MeshStandardMaterial({ color: '#7FFFD4' }),
  cubic_zirconia: new THREE.MeshStandardMaterial({ color: '#FFFFFF' })
};

function JewelryModel({ modelPath, selectedMetal, selectedStone }) {
  const { nodes } = useGLTF(modelPath);

 const texture = useLoader(RGBELoader, '/Env/aerodynamics_workshop_1k.hdr');

  const metal = nodes.R190_Metal;
  const stone = nodes.R190_Stone;

  return (
    <group position={[0, -0.5, 0]}>
      {/* Metal Part */}
      <mesh
        geometry={metal.geometry}
        position={metal.position}
        rotation={metal.rotation}
        scale={metal.scale}
        material={metalMaterials[selectedMetal]}
        castShadow
        receiveShadow
      />

      {/* Stone Part with Caustics and Refraction */}
      <CubeCamera resolution={256} frames={1} envMap={texture}>
        {(envMap) => (
          <Caustics
            backfaces
            color={stoneMaterials[selectedStone].color}
            lightSource={[5, 5, -10]}
            worldRadius={0.05}
            ior={1.8}
            backfaceIor={1.1}
            intensity={0.5}
          >
            <mesh
              geometry={stone.geometry}
              position={stone.position}
              rotation={stone.rotation}
              scale={stone.scale}
              castShadow
              receiveShadow
            >
              <MeshRefractionMaterial
                envMap={envMap}
                // {...config}
                bounces={2}
                aberrationStrength={0.01}
                ior={1.7}
                fresnel={1}
                color={stoneMaterials[selectedStone].color}
                toneMapped={false}
              />
            </mesh>
          </Caustics>
        )}
      </CubeCamera>
    </group>
  )
}


function App({ modelPath = '/models/R190.glb' }) {
  const [selectedModel, setSelectedModel] = useState('R190');
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [selectedStone, setSelectedStone] = useState('cubic_zirconia');

  // Available jewelry models
  const jewelryModels = {
    'R190': '/models/R190.glb',
    'ER05': '/models/ER05.glb',
    'R192': '/models/R192.glb',
    // Add more models as needed
  };

  // Get current model path
  const currentModelPath = jewelryModels[selectedModel] || modelPath;

  return (
    <div className="app-container">
      <Canvas shadows camera={{ position: [-5, 0.5, 5], fov: 45 }}>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5 * Math.PI} />
      <spotLight decay={0} position={[5, 5, -10]} angle={0.15} penumbra={1} />
      <pointLight decay={0} position={[-10, -10, -10]} />
      <JewelryModel modelPath={currentModelPath} selectedMetal={selectedMetal} selectedStone={selectedStone} />
      <AccumulativeShadows
        temporal
        frames={100}
        color="orange"
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.7}
        opacity={1}
        scale={12}
        position={[0, -0.5, 0]}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
      </AccumulativeShadows>
      <Environment files="/Env/aerodynamics_workshop_1k.hdr" />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={2} levels={5} mipmapBlur />
      </EffectComposer>
    </Canvas>

      {/* Floating Control Panel */}
      <div className="floating-controls">
        <div className="control-group">
          <label className="control-label">Model</label>
          <select
            className="control-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="R190">Ring R190</option>
            <option value="R191">Ring R191</option>
            <option value="R192">Ring R192</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Metal</label>
          <select
            className="control-select"
            value={selectedMetal}
            onChange={(e) => setSelectedMetal(e.target.value)}
          >
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="rose_gold">Rose Gold</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Stone</label>
          <select
            className="control-select"
            value={selectedStone}
            onChange={(e) => setSelectedStone(e.target.value)}
          >
            <option value="sapphire">Sapphire</option>
            <option value="citrine">Citrine</option>
            <option value="opal">Opal</option>
            <option value="aquamarine">Aquamarine</option>
            <option value="cubic_zirconia">White Cubic Zirconia</option>
          </select>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload('/models/R190.glb');

export default App