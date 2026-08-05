import { Environment, Float, PresentationControls, useGLTF } from '@react-three/drei'

export default function Experience()
{
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')

    return <>

        <Environment preset='city' />

        <color args={ ['#241a1a'] } attach="background" />

        <PresentationControls
            global
            rotation={ [0.13, 0.1, 0] }
            polar={ [-.04, 0.2] }
            azimuth={ [-1, 0.75] }
            damping={ 0.1 }
            config={ {mass: 2, tension: 400} }
            snap
        >
            <Float rotationIntensity={ 0.4 }>
                <primitive
                    object={ computer.scene }
                    position-y={ -1.2 }
                />
            </Float>
        </PresentationControls>

    </>
}