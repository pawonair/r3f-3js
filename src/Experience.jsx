import { useFrame, useThree } from '@react-three/fiber'
import {
    AccumulativeShadows,
    BakeShadows,
    ContactShadows,
    Environment,
    Lightformer,
    OrbitControls,
    RandomizedLight,
    Sky,
    SoftShadows,
    Stage,
    useHelper
} from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()

    useFrame((state, delta) => {
        // const time = state.clock.elapsedTime
        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    const { perfVisible } = useControls({
        perfVisible: true
    })

    const { position, color, visible } = useControls('sphere', {
        position: {
            value: { x: -2, y: 1 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: 'orange',
        visible: true,
        myInterval: {
            min: 0,
            max: 10,
            value: [4, 5]
        },
        clickMe: button(() => { console.log('ok') }),
        choice: { options: ['a', 'b', 'c'] }
    })

    const { scale } = useControls('cube', {
        scale: {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    })

    const { shadowColor, opacity, blur} = useControls('contact-shadows', {
        shadowColor: '#4b2709',
        opacity: {
            value: 0.5,
            min: 0,
            max: 1
        },
        blur: {
            value: 3,
            min: 0,
            max: 10
        }
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [ 1, 2, 3 ] }
    })

    const {
        envMapIntensity,
        envMapHeight,
        envMapRadius,
        envMapScale
    } = useControls('enviroment map', {
        envMapIntensity: {
            value: 2.5,
            min: 0,
            max: 12
        },
        envMapHeight: {
            value: 7,
            min: 0,
            max: 100
        },
        envMapRadius: {
            value: 28,
            min: 10,
            max: 1000
        },
        envMapScale: {
            value: 100,
            min: 10,
            max: 1000
        },
    })

    // const scene = useThree(state => state.scene)

    // useEffect(() => {
    //     scene.environmentIntensity = envMapIntensity
    // }, [ envMapIntensity ])

    return <>

        {/* <Environment
            // background
            // files={ [
            //     './environmentMaps/2/px.jpg',
            //     './environmentMaps/2/nx.jpg',
            //     './environmentMaps/2/py.jpg',
            //     './environmentMaps/2/ny.jpg',
            //     './environmentMaps/2/pz.jpg',
            //     './environmentMaps/2/nz.jpg',
            // ] }
            // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
            preset="sunset"
            ground={
                {
                    height: envMapHeight,
                    radius: envMapRadius,
                    scale: envMapScale
                }
            }
        > */}
            {/* Custom environment maps */}
            {/* <color args={ [ '#000000' ] } attach="background" /> */}
            {/* <mesh position-z={ -5 } scale={ 10 }>
                <planeGeometry />
                <meshBasicMaterial color={ [ 10, 0, 0 ] } />
            </mesh> */}
            {/* <Lightformer
                position-z={ -5 }
                scale={ 10 }
                color="red"
                intensity={ 10 }
                form="ring"
            /> */}
        {/* </Environment> */}

        
        {/* <BakeShadows /> */}
        {/* <SoftShadows size={ 25 } samples={ 10 } focus={ 0 } /> */}

        <color args={ [ 'ivory' ] } attach="background" />

        { perfVisible && <Perf position='top-left' /> }

        <OrbitControls makeDefault />

        {/* Good for static or slow moving objects */}
        {/* <AccumulativeShadows 
            position={ [ 0, -0.99, 0 ] }
            scale={ 10 }
            color='#316d39'
            opacity={ 0.8 }
            frames={ Infinity }
            temporal
            blend={ 100 }
        >
            <RandomizedLight
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 3 }
                position={ [ 1, 2, 3 ] }
                bias={ 0.001 }
            />
        </AccumulativeShadows> */}

        {/* <ContactShadows
            position={ [ 0, 0, 0 ] }
            scale={ 10 }
            resolution={ 512 }
            color={ shadowColor }
            opacity={ opacity }
            blur={ blur }
        /> */}

        {/* <directionalLight
            ref={ directionalLight }
            // castShadow
            // position={ [ 1, 2, 3 ] }
            position={ sunPosition }
            intensity={ 4.5 }
            shadow-mapSize={ [ 1024, 1024] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ -5 }
            shadow-camera-left={ -5 }
        /> */}
        {/* <ambientLight intensity={ 1.5 } /> */}

        {/* <Sky sunPosition={ sunPosition } /> */}

        <Stage
            shadows={
                {
                    type: 'contact',
                    opacity: 0.2,
                    blur: 3
                }
            }
            environment="sunset"
            preset="portrait"
            intensity={ envMapIntensity }
        >
            <mesh castShadow position={ [ position.x, position.y, 0 ] } visible={ visible }>
                <sphereGeometry />
                <meshStandardMaterial color={ color } />
            </mesh>

            <mesh castShadow ref={ cube } position-x={ 2 } position-y={ 1 } scale={ scale }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </Stage>

        {/* <mesh receiveShadow position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh> */}

    </>
}