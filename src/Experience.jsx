import { Center, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial})

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    return <>

        <color args={ ['#030202'] } attach="background" />

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={ nodes.baked.geometry }>
                {/* Flips just for the mesh-basic-material */}
                {/* <meshBasicMaterial map={ bakedTexture } map-flipY={ false } /> */}
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            {/* meshs for pole light */}
            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={ nodes.poleLightA.position }
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>
            
            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={ nodes.poleLightB.position }
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            {/* Potal light mesh */}
            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                {/* glsl shader (vertex, fragment) for portal */}
                <portalMaterial ref={ portalMaterial } />
            </mesh>

            {/* Animated sparkles from drei */}
            <Sparkles
                size={ 6 }
                scale={ [4, 2, 4] }
                position-y={ 1 }
                speed={ 0.2 }
                count={ 40 }
            />
        </Center>

    </>
}