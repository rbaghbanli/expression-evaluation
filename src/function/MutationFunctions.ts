import { FunctionDefinition } from '../FunctionDefinition.js';
import { Value, typeNumber, typeBuffer, typeString, typeArray, typeOptionalNumber, typeOptionalString, typeJson } from '../Type.js';

export const funcToUniversalTime = new FunctionDefinition(
	(value: number)=> {
		const v = new Date(value);
		return [v.getUTCFullYear(), v.getUTCMonth() + 1, v.getUTCDate(),
			v.getUTCHours(), v.getUTCMinutes(), v.getUTCSeconds(), v.getUTCMilliseconds()];
	},
	typeArray, [typeNumber],
);

export const funcFromUniversalTime = new FunctionDefinition(
	(time: number[])=>
		Date.UTC(time[0] ?? 1970, (time[1] ?? 1) - 1, time[2] ?? 1, time[3] ?? 0, time[4] ?? 0, time[5] ?? 0, time[6] ?? 0),
	typeNumber, [typeArray],
);

export const funcToLocalTime = new FunctionDefinition(
	(value: number)=> {
		const v = new Date(value);
		return [v.getFullYear(), v.getMonth() + 1, v.getDate(),
			v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()];
	},
	typeArray, [typeNumber],
);

export const funcFromLocalTime = new FunctionDefinition(
	(time: number[])=>
		new Date(time[0] ?? 1970, (time[1] ?? 1) - 1, time[2] ?? 1, time[3] ?? 0, time[4] ?? 0, time[5] ?? 0, time[6] ?? 0).getTime(),
	typeNumber, [typeArray],
);

export const funcToUniversalTimeMonthIndex = new FunctionDefinition(
	(value: number)=> new Date(value).getUTCMonth(),
	typeNumber, [typeNumber],
);

export const funcToLocalTimeMonthIndex = new FunctionDefinition(
	(value: number)=> new Date(value).getMonth(),
	typeNumber, [typeNumber],
);

export const funcToUniversalTimeWeekdayIndex = new FunctionDefinition(
	(value: number)=> new Date(value).getUTCDay(),
	typeNumber, [typeNumber],
);

export const funcToLocalTimeWeekdayIndex = new FunctionDefinition(
	(value: number)=> new Date(value).getDay(),
	typeNumber, [typeNumber],
);

export const funcToTimeString = new FunctionDefinition(
	(value: number)=> new Date(value).toISOString(),
	typeString, [typeNumber],
);

export const funcFromTimeString = new FunctionDefinition(
	(value: string)=> new Date(value).getTime(),
	typeNumber, [typeString],
);

export const funcToNumberBuffer = new FunctionDefinition(
	(value: number, encoding: 'int8' | 'int16' | 'int16le' | 'int32' | 'int32le'
			| 'uint8' | 'uint16' | 'uint16le' | 'uint32' | 'uint32le'
			| 'float32' | 'float32le' | 'float64' | 'float64le')=> {
		let bits = '';
		for (let i = 0; i < encoding.length; ++i) {
			const c = encoding[i];
			if (c >= '0' && c <= '9') {
				bits += c;
			}
		}
		const dv = new DataView(new Uint8Array(Number.parseInt(bits) / 8).buffer);
		switch (encoding) {
			case 'int8': dv.setInt8(0, value); break;
			case 'int16': dv.setInt16(0, value); break;
			case 'int16le': dv.setInt16(0, value, true); break;
			case 'int32': dv.setInt32(0, value); break;
			case 'int32le': dv.setInt32(0, value, true); break;
			case 'uint8': dv.setUint8(0, value); break;
			case 'uint16': dv.setUint16(0, value); break;
			case 'uint16le': dv.setUint16(0, value, true); break;
			case 'uint32': dv.setUint32(0, value); break;
			case 'uint32le': dv.setUint32(0, value, true); break;
			case 'float32': dv.setFloat32(0, value); break;
			case 'float32le': dv.setFloat32(0, value, true); break;
			case 'float64': dv.setFloat64(0, value); break;
			case 'float64le': dv.setFloat64(0, value, true); break;
			default: throw new Error(`${encoding} encoding not supported`);
		}
		return dv.buffer;
	},
	typeBuffer, [typeNumber, typeString],
);

export const funcFromNumberBuffer = new FunctionDefinition(
	(buffer: ArrayBuffer, encoding: 'int8' | 'int16' | 'int16le' | 'int32' | 'int32le'
			| 'uint8' | 'uint16' | 'uint16le' | 'uint32' | 'uint32le'
			| 'float32' | 'float32le' | 'float64' | 'float64le', byteOffset?: number)=> {
		const dv = new DataView(buffer, byteOffset);
		switch (encoding) {
			case 'int8': return dv.getInt8(0);
			case 'int16': return dv.getInt16(0);
			case 'int16le': return dv.getInt16(0, true);
			case 'int32': return dv.getInt32(0);
			case 'int32le': return dv.getInt32(0, true);
			case 'uint8': return dv.getUint8(0);
			case 'uint16': return dv.getUint16(0);
			case 'uint16le': return dv.getUint16(0, true);
			case 'uint32': return dv.getUint32(0);
			case 'uint32le': return dv.getUint32(0, true);
			case 'float32': return dv.getFloat32(0);
			case 'float32le': return dv.getFloat32(0, true);
			case 'float64': return dv.getFloat64(0);
			case 'float64le': return dv.getFloat64(0, true);
			default: throw new Error(`${encoding} encoding not supported`);
		}
	},
	typeNumber, [typeBuffer, typeString, typeOptionalNumber], 2, 3,
);

export const funcToStringBuffer = new FunctionDefinition(
	(value: string, encoding: 'utf8' | 'ucs2' | 'ucs2le' = 'utf8')=> {
		if (encoding === 'utf8') {
			return new TextEncoder().encode(value).buffer;
		}
		else {
			const dv = new DataView(new Uint16Array(value.length).buffer);
			const lessOrEqual = encoding.endsWith('le');
			for (let i = 0; i < value.length; ++i) {
				dv.setUint16(i << 1, value.charCodeAt(i), lessOrEqual);
			}
			return dv.buffer;
		}
	},
	typeBuffer, [typeString, typeOptionalString], 1, 2,
);

export const funcFromStringBuffer = new FunctionDefinition(
	(value: ArrayBuffer, encoding: 'utf8' | 'ucs2' | 'ucs2le' = 'utf8', byteOffset?: number, byteLength?: number)=> {
		if (encoding === 'utf8') {
			return new TextDecoder().decode(new DataView(value, byteOffset, byteLength));
		}
		else {
			const dv = new DataView(value, byteOffset, byteLength);
			const lessOrEqual = encoding.endsWith('le');
			let str = '';
			for (let i = 0; i < dv.byteLength; i += 2) {
				str += String.fromCharCode(dv.getUint16(i, lessOrEqual));
			}
			return str;
		}
	},
	typeString, [typeBuffer, typeOptionalString, typeOptionalNumber, typeOptionalNumber], 1, 4,
);

export const funcToNumberString = new FunctionDefinition(
	(value: number, radix?: number)=>
		value.toString(radix),
	typeString, [typeNumber], 1, 2,
);

export const funcFromNumberString = new FunctionDefinition(
	(value: string)=>
		Number.parseFloat(value),
	typeNumber, [typeString],
);

export const funcToBufferString = new FunctionDefinition(
	(value: ArrayBuffer)=>
		stringifyBuffer(value),
	typeString, [typeBuffer],
);

export const funcFromBufferString = new FunctionDefinition(
	(value: string)=>
		parseBuffer(value),
	typeBuffer, [typeString],
);

export const funcToJsonString = new FunctionDefinition(
	(value: undefined | boolean | number | string | [] | { [ key: string ]: Value })=>
		value ? JSON.stringify(value) : undefined,
	typeOptionalString, [typeJson],
);

export const funcFromJsonString = new FunctionDefinition(
	(value: undefined | string)=>
		value ? JSON.parse(value) as Value : undefined,
	typeJson, [typeOptionalString],
);

export const stringifyBuffer = (value: ArrayBuffer)=> {
	const bytes = new Uint8Array(value);
	let str = '';
	for (let i = 0; i < bytes.byteLength; ++i) {
		str += bytes[i].toString(16).padStart(2, '0');
	}
	return str;
};

export const parseBuffer = (value: string)=> {
	const bytes = new Uint8Array(Math.ceil(value.length / 2));
	for (let i = 0, c = 0; c < value.length; ++i) {
		bytes[i] = Number.parseInt(value.slice(c, c += 2), 16);
	}
	return bytes.buffer;
};
