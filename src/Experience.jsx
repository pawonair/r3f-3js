export default function Experience() {
    return <>
        <mesh rotation-y={ Math.PI * 0.23 } position-x={ 2 } scale={ 1.5 }>
            {/* <sphereGeometry args={ [1.5, 32, 32] } /> */}
            {/* <meshBasicMaterial args={ [{ color: 'red', wireframe: true }] } /> */}
            <boxGeometry scale={ 1.5 } />
            <meshBasicMaterial color="mediumpurple" wireframe />
        </mesh>
    </>
}