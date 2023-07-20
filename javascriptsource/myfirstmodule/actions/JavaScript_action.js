// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import "mx-global";
import { Big } from "big.js";

// BEGIN EXTRA CODE
async function injectDeps(deps) {
	return await new Promise((resolve, reject) => {
		if (!Array.isArray(deps)) {
			deps = [deps];
		}
		window.dojoDynamicRequire(deps, function() { resolve(Array.from(arguments)) });
	});
}
function onDestroy(containerId, cb) {
	var myWidget = dojo.dijit.registry.byId(containerId);

	myWidget.addOnDestroy(cb);
}

//================================================
function updateTextContent(layer, index, newText) {
	const text = layer.getChildren()[index];
	if (text) {
		text.text(newText);
		layer.draw();
	}
}





function calculateRectPositions(rectangles, dynamicValues) {
	const results = [];

	rectangles.forEach((rectConfig, index) => {
		const { cx, cy, cw, c1, c2, c3 } = rectConfig;
		const d1 = dynamicValues[index];

		if (d1 >= c2 && d1 <= c3) {
			const h = ((d1 - c2) / (c3 - c2)) * (cy - c1);
			const x = cx;
			const y = cy - h;
			const height = h;

			results.push({ x, y, width: cw, height });
		}
	});

	return results;
}

function generateRandomDynamicValues(numValues, minValue, maxValue) {
	const dynamicValues = [];
	for (let i = 0; i < numValues; i++) {
		const value = Math.random() < 0.5 ? (maxValue - minValue) / 2 + minValue : maxValue;
		dynamicValues.push(value);
	}
	return dynamicValues;
}

function initializeRectangles(layer, rectangles) {
	rectangles.forEach(rectConfig => {
		const rect = new Konva.Rect({
			x: rectConfig.cx,
			y: rectConfig.cy,
			width: rectConfig.cw,
			height: 0,
			fill: "rgb(180, 178, 255)"
		});
		layer.add(rect);
	});
}

function updateRectPositions(layer, rectangles, dynamicValues) {
	const positions = calculateRectPositions(rectangles, dynamicValues);

	rectangles.forEach((rectConfig, index) => {
		if (index < positions.length) {
			const position = positions[index];
			const rect = layer.getChildren()[index];
			rect.position(position);
			rect.height(position.height);
		}
	});

	layer.draw();
}

//======================================

function main(Konva, containerId) {
	const txts = [
		{ x: 950, y: 110 },//Bottles produced
		{ x: 900, y: 145 },//Bottles faulty
		{ x: 900, y: 200 },//Tank level 
		{ x: 1007, y: 241 },//Tank temperature
		{ x: 982, y: 275 },//Tank pressure
		{ x: 905, y: 310 },//Bottle level
	];
	// 初始化常量矩形数组
	const rectangles = [
		// x_left      x_right        y_down   y_up    min    max
		{ cx: 320, cw: 654 - 320, cy: 315, c1: 78, c2: 0, c3: 1600 },
		{ cx: 293, cw: 323 - 293, cy: 425, c1: 380, c2: 0, c3: 100 },
		{ cx: 293 + 54 * 1 + 3, cw: 323 - 293, cy: 425, c1: 380, c2: 0, c3: 100 },
		{ cx: 293 + 54 * 2 + 7, cw: 323 - 293, cy: 425, c1: 380, c2: 0, c3: 100 },
		{ cx: 293 + 54 * 3 + 11, cw: 323 - 293, cy: 425, c1: 380, c2: 0, c3: 100 },
		{ cx: 293 + 54 * 4 + 15, cw: 323 - 293, cy: 425, c1: 380, c2: 0, c3: 100 },
		{ cx: 293 + 54 * 5 + 19, cw: 323 - 293, cy: 425, c1: 380, c2: 0, c3: 100 },
		{ cx: 293 + 54 * 6 + 23, cw: 323 - 293, cy: 425, c1: 380, c2: 0, c3: 100 },
		// Add more rectangles as needed
	];

	// 每隔半秒生成随机动态值，并更新 rect 位置和高度
	const interval = 500; // 半秒（单位：毫秒）
	const numDynamicValues = rectangles.length;
	const minDynamicValue = 0;
	const maxDynamicValue = 100;
	// 创建舞台
	const stage = new Konva.Stage({
		container: containerId,
		width: 578 * 2,
		height: 251 * 2
	});


	// 加载背景图片
	const imageObj = new Image();
	imageObj.onload = function() {
		//-------------------------------------------------------------------
		
		const layerTxt = new Konva.Layer();
		// 初始化 layer（假设你已经有了一个 Konva.Layer 实例）
		const layerWater = new Konva.Layer();
		// 初始化 rect 对象
		initializeRectangles(layerWater, rectangles);

		function updateRectanglesWithRandomValues() {
			const dynamicValues = generateRandomDynamicValues(numDynamicValues, minDynamicValue, maxDynamicValue);
			// 更新文本内容
			const index = 0; // 假设你想更新第一个文本对象
			const newText = "New Text Content";
			updateTextContent(layerTxt, index, newText);
			updateRectPositions(layerWater, rectangles, dynamicValues);
		}

		// 第一次立即执行一次，之后每隔半秒执行一次 updateRectanglesWithRandomValues 函数
		//updateRectanglesWithRandomValues();
		//setInterval(updateRectanglesWithRandomValues, interval);
		//-----------------------------
		// 添加背景层



		// 创建文本
		// 添加文本对象到 layerTxt
		txts.forEach(txtConfig => {
			const text = new Konva.Text({
				x: txtConfig.x,
				y: txtConfig.y,
				text: "50",
				fontSize: 20,
				fontFamily: "Arial",
				fill: "white"
			});
			layerTxt.add(text);
		});


		
		const layer = new Konva.Layer();

		// 创建图像
		const image = new Konva.Image({
			x: 0,
			y: 0,
			image: imageObj,
			width: stage.width(),
			height: stage.height()
		});


		// 添加到层
		layer.add(image);

		// 添加到舞台
		stage.add(layer);
		stage.add(layerTxt);
		stage.add(layerWater);

		// 监听舞台的mousemove事件
		stage.on("mousemove", (e) => {
			// 获取鼠标的x和y坐标
			const mousePos = stage.getPointerPosition();
			const mouseX = mousePos.x;
			const mouseY = mousePos.y;

			console.log(`鼠标坐标：x=${mouseX}, y=${mouseY}`);
		});

		function updateKonvaObjects(data) {
			const { tank_level, number_produced, number_faulty, tank_temperature, tank_pressure, bottle_level } = data;

			updateRectPositions(layerWater, rectangles, [tank_level].concat(new Array(7).fill(bottle_level)));

			// 更新文本内容
			const txtContents = [
				`${number_produced}`,
				`${number_faulty}`,
				`${tank_level}`,
				`${tank_temperature}`,
				`${tank_pressure}`,
				`${bottle_level}`,
			];
			txtContents.forEach((content, index) => {
				const textObj = layerTxt.getChildren()[index]; // 从 layerTxt 获取文本对象
				textObj.text(content); // 更新文本内容
			});

			// 重新绘制层
			layerWater.draw();
			layerTxt.draw();
		}

		const socket = new WebSocket(mx.appUrl.replace('http', 'ws') + 'ws');

		socket.onopen = () => {
			console.log('Connected to server');
		};

		socket.onmessage = (event) => {
			console.log(event.data);
			updateKonvaObjects(JSON.parse(event.data));
		};

		socket.onclose = () => {
			console.log('Disconnected from server');
		};

		onDestroy(containerId, () => {
			//dispose
			socket.close();
		});

	};

	imageObj.src = "b.png";
}
// END EXTRA CODE

/**
 * @param {string} containerId
 * @returns {Promise.<void>}
 */
export async function JavaScript_action(containerId) {
	// BEGIN USER CODE
	const container = document.querySelector('#' + containerId);
	let lang = mx.session.sessionData.locale.code.split('_')[0];

	const [Konva] = await injectDeps('https://unpkg.com/konva@8.4.3/konva.min.js')
	main(Konva, containerId);

	// END USER CODE
}