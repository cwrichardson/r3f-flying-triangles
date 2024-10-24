import { forwardRef } from 'react';

export const Floor = forwardRef((props, ref) => {
    return (
        <mesh
            rotation-x={-Math.PI / 2}
            position-y={ -1.1 }
            receiveShadow
        >
            <planeGeometry
              args={[15, 15, 100, 100]}
            />
            <meshStandardMaterial color={0xffffff} />
        </mesh>
    )
})

Floor.displayName = 'Floor';