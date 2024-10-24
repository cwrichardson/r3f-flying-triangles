import { forwardRef, useImperativeHandle, useRef } from 'react';
import { MeshStandardMaterial } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

export const CustomMaterial = forwardRef((props, ref) => {
	const {
		vertexShader = '',
		fragmentShader = '',
		uniforms = {},
		...rest
	} = props;
	console.log('got props', props)

	const materialRef = useRef();
	useImperativeHandle(ref, () => materialRef, []);

	return (
		<CustomShaderMaterial
			ref={materialRef}
			baseMaterial={MeshStandardMaterial}
			vertexShader={vertexShader}
			// fragmentShader={fragmentShader}
			uniforms={uniforms}
			{...rest}
		/>
	)
});

CustomMaterial.displayName = 'CustomMaterial';