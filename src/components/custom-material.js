import { forwardRef, useMemo } from 'react';
import { MeshDepthMaterial, MeshStandardMaterial } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

export const CustomMaterial = forwardRef((props, ref) => {
	const {
		vertexShader = '',
		fragmentShader = '',
		...rest
	} = props;
	console.log('got props', props)

	const uniforms = useMemo(() => ({
		uTime: { value: 0 }
	}), [])

	return (
		<CustomShaderMaterial
			ref={ref}
			baseMaterial={MeshStandardMaterial}
			vertexShader={vertexShader}
			// fragmentShader={fragmentShader}
			uniforms={uniforms}
			{...rest}
		/>
	)
});

CustomMaterial.displayName = 'CustomMaterial';

export const CustomDepthMaterial = forwardRef((props, ref) => {
	const {
		vertexShader = '',
		fragmentShader = '',
		...rest
	} = props;
	console.log('got props', props)

	const uniforms = useMemo(() => ({
		uTime: { value: 0 }
	}), [])

	return (
		<CustomShaderMaterial
			ref={ref}
			baseMaterial={MeshDepthMaterial}
			vertexShader={vertexShader}
			// fragmentShader={fragmentShader}
			uniforms={uniforms}
			{...rest}
		/>
	)
});

CustomDepthMaterial.displayName = 'CustomDepthMaterial';