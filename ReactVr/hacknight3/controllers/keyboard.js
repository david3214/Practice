/**
 * Martin <i@martinpham.com>
 */

import {Vector3, Quaternion} from 'three';


const MOVING_SPEED = 100;

class ObjectNotation {
	position = null;
	quaternion = null;

	constructor(position, quaternion) {
		this.position = position;
		this.quaternion = quaternion;
	}

	translateOnAxis = (axis, distance) => {
		const v1 = new Vector3();

		v1.copy(axis).applyQuaternion(this.quaternion);

		this.position.add(v1.multiplyScalar(distance));

	};

	rotateOnAxis = (axis, distance) => {
		const v1 = new Vector3();

		v1.copy(axis).applyQuaternion(this.quaternion * distance);

		this.quaternion.add(v1.multiplyScalar(distance));

	};

	translateX = (distance) => {
		this.translateOnAxis(new Vector3(1, 0, 0), distance);
	};
	translateY = (distance) => {
		this.translateOnAxis(new Vector3(0, 1, 0), distance);
	};
	translateZ = (distance) => {
		this.translateOnAxis(new Vector3(0, 1, 0), distance);
	};
	rotateY = (degrees) => {
		this.rotateOnAxis(new Quaternion(0, 1, 0), degrees);
	}
}


export default class KeyboardCameraController {
	_movingZ = 0;
	_movingX = 0;
	_rotatingY = 0;

	constructor() {


		document.addEventListener('keydown', (event) => this.onKeyDown(event));

		window.addEventListener("message", (event) => {
			if(event.data.type ==='KEYBOARD_CAMERA_CONTROLLER_MESSAGE')
			{
				if(event.data.direction ==='UP')
				{
					this._moveForward();
				}else if(event.data.direction ==='DOWN')
				{
					this._moveBackward();
				}else if(event.data.direction ==='LEFT')
				{
					// this._moveLeft();
					this._rotateLeft();
				}else if(event.data.direction ==='RIGHT')
				{
					this._moveRight();
				}
			}
		}, false);
	}

	_rotateLeft = () => {
		this._rotatingY = MOVING_SPEED
	}

	_moveForward = () => {
		this._movingZ = -MOVING_SPEED;
	}

	_moveBackward = () => {
		this._movingZ = MOVING_SPEED;
	}

	_moveLeft = () => {
		this._movingX = -MOVING_SPEED;
	}

	_moveRight = () => {
		this._movingX = MOVING_SPEED;
	}

	onKeyDown = (event) => {
		if (event.keyCode === 38 || event.keyCode === 87) {
			this._moveForward();
		}
		else if (event.keyCode === 40 || event.keyCode === 83) {
			this._moveBackward();
		}
		else if (event.keyCode === 37 || event.keyCode === 65) {
			// this._moveLeft();
			this._rotateLeft();
		}
		else if (event.keyCode === 39 || event.keyCode === 68) {
			this._moveRight();
		}
	}

	fillCameraProperties(positionArray, rotationArray) {
		if (this._movingZ === 0 && this._movingX === 0) {
			return false;
		}


		const quaternion = new Quaternion(rotationArray[0], rotationArray[1], rotationArray[2], rotationArray[3]);
		const position = new Vector3(positionArray[0], positionArray[1], positionArray[2]);

		const cameraObjectNotation = new ObjectNotation(position, quaternion);

		if(this._movingZ !== 0)
		{
			cameraObjectNotation.translateZ(this._movingZ);
		}

		if(this._movingX !== 0)
		{
			cameraObjectNotation.translateX(this._movingX);
		}

		if(this._rotatingY !== 0){
			cameraObjectNotation.rotateY(this._rotatingY)
		}

		positionArray[0] = cameraObjectNotation.position.x;
		// positionArray[1] = cameraObjectNotation.position.y; // i don't want to fly
		positionArray[2] = cameraObjectNotation.position.z

		rotationArray[2] = cameraObjectNotation.quaternion.y

		this._movingZ = 0;
		this._movingX = 0;

		this._rotatingY = 0

		return true;
	}
}
