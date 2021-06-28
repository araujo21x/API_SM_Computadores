import FilterQuestions from '../database/entity/filterQuestions.entity';
import responseQueries from '../helpers/filterResponseQueries';
import MotherFrequency from '../database/entity/motherFrequency.entity';
import CpuFrequency from '../database/entity/cpuFrequency.entity';
import CoolerSocket from '../database/entity/coolerCompatibility.entity';

export default function (question: FilterQuestions, parts: any[], otherFields:any[]):any[] {
  let answer: any;

  switch (question.typePart) {
    case 'motherBoard':
      answer = getResponseMotherB(question, parts, otherFields);
      break;
    case 'cpu':
      answer = getResponseCPU(question, parts, otherFields);
      break;
    case 'cooler':
      answer = getResponseCooler(question, parts, otherFields);
      break;
    case 'ram':
      answer = getResponseRam(question, parts);
      break;
    case 'pciExpress':
      answer = getResponsePCIe(question, parts);
      break;
    case 'rom':
      answer = getResponseRom(question, parts);
      break;
    case 'm2':
      answer = getResponseM2(question, parts);
      break;
  }
  return answer;
}

function getResponseMotherB (question: FilterQuestions, parts: any, mFrequency:MotherFrequency[]) {
  let answer: any;

  switch (question.name) {
    case 'chipset':
      answer = responseQueries.organizeDbFields(parts, 'chipset');
      break;
    case 'socket':
      answer = responseQueries.organizeDbFields(parts, 'socket');
      break;
    case 'memorySizeSupport':
      answer = responseQueries.organizeDbFields(parts, 'memorySizeSupport');
      break;
    case 'motherFrequencies':
      answer = responseQueries.organizeDbFields(mFrequency, 'frequency');
      break;
  }
  return answer;
}

function getResponseCPU (question: FilterQuestions, parts: any, cFrequency:CpuFrequency[]):any[] {
  let answer: any;

  switch (question.name) {
    case 'chipset':
      answer = responseQueries.organizeDbFields(parts, 'chipset');
      break;
    case 'socket':
      answer = responseQueries.organizeDbFields(parts, 'socket');
      break;
    case 'memorySizeSupport':
      answer = responseQueries.organizeDbFields(parts, 'memorySizeSupport');
      break;
    case 'cpuFrequencies':
      answer = responseQueries.organizeDbFields(cFrequency, 'frequency');
      break;
    case 'maximumBoostSpeed':
      answer = responseQueries.organizeDbFields(parts, 'maximumBoostSpeed');
      break;
    case 'baseClockSpeed':
      answer = responseQueries.organizeDbFields(parts, 'baseClockSpeed');
      break;
    case 'cache':
      answer = responseQueries.organizeDbFields(parts, 'cache');
      break;
    case 'core':
      answer = responseQueries.organizeDbFields(parts, 'core');
      break;
    case 'threads':
      answer = responseQueries.organizeDbFields(parts, 'threads');
      break;
    case 'grapshicProcessor':
      answer = responseQueries.organizeDbFields(parts, 'graphicsProcessor');
      break;
  }

  return answer;
}

function getResponseCooler (question: FilterQuestions, parts: any, cSocket:CoolerSocket[]): any[] {
  let answer: any;

  switch (question.name) {
    case 'compatibilityCpu':
      answer = responseQueries.organizeDbFields(cSocket, 'compatibilityCpu');
      break;
    case 'speedFan':
      answer = responseQueries.organizeDbFields(parts, 'speedFan');
      break;
    case 'fanAirflow':
      answer = responseQueries.organizeDbFields(parts, 'fanAirflow');
      break;
  }
  return answer;
}

function getResponseRam (question: FilterQuestions, parts: any[]) {
  let answer:any;

  switch (question.name) {
    case 'memoryFrequency':
      answer = responseQueries.organizeDbFields(parts, 'memoryFrequency');
      break;
  }

  return answer;
}

function getResponsePCIe (question: FilterQuestions, parts: any[]) {
  let answer:any;

  switch (question.name) {
    case 'baseClock':
      answer = responseQueries.organizeDbFields(parts, 'baseClock');
      break;
    case 'boostClock':
      answer = responseQueries.organizeDbFields(parts, 'boostClock');
      break;
    case 'CUDACore':
      answer = responseQueries.organizeDbFields(parts, 'CUDACore');
      break;
    case 'memoryInterface':
      answer = responseQueries.organizeDbFields(parts, 'memoryInterface');
      break;
    case 'memorySize':
      answer = responseQueries.organizeDbFields(parts, 'memorySize');
      break;
    case 'memorySpeed':
      answer = responseQueries.organizeDbFields(parts, 'memorySpeed');
      break;
  }

  return answer;
}

function getResponseRom (question: FilterQuestions, parts: any[]):any {
  let answer:any;

  switch (question.name) {
    case 'reading':
      answer = responseQueries.organizeDbFields(parts, 'reading');
      break;
    case 'writing':
      answer = responseQueries.organizeDbFields(parts, 'writing');
      break;
    case 'rotation':
      answer = responseQueries.organizeDbFields(parts, 'rotation');
      break;
  }

  return answer;
}

function getResponseM2 (question: FilterQuestions, parts: any[]) {
  let answer:any;

  switch (question.name) {
    case 'reading':
      answer = responseQueries.organizeDbFields(parts, 'reading');
      break;
    case 'writing':
      answer = responseQueries.organizeDbFields(parts, 'writing');
      break;
  }

  return answer;
}
