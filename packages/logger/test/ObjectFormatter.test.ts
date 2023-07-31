import {ObjectFormatter} from "../src/ObjectFormatter";
import {ILogFormatter, LogFormatterOptions, LogObjectFormatter} from '../src/ILogFormatter';
import {expect} from '@jest/globals';

class TestObject implements ILogFormatter<TestObject> {
    a = 111;
    b = 222;
    c = 333;

    get logFormatter(): LogFormatterOptions<TestObject> {
        return {
            excludeFields: [
                "c"
            ]
        };
    }
}

it("Test object formatter (object)", ()=> {
    const o = new ObjectFormatter({objectFormatter: undefined, getGlobalObjectFormatters: () => undefined})
    const data = new TestObject();
    const result = o.processParamObject(data);
    expect(result).toStrictEqual({a: 111, b: 222})
})

it("Test object formatter (array)", ()=> {
    const o = new ObjectFormatter({objectFormatter: undefined, getGlobalObjectFormatters: () => undefined})
    const data = [new TestObject(), new TestObject()];
    const result = o.processParamObject(data);
    expect(result).toStrictEqual([{a: 111, b: 222}, {a: 111, b: 222}]);
})

it("Test global object formatter", () => {
    const objectFormatter: LogObjectFormatter = (data) => {
        delete (data as any).a1;
        return data;
    };
    const o = new ObjectFormatter({objectFormatter, getGlobalObjectFormatters: () => undefined})
    const data = {data: {a1: 111, a2: 222}};
    const result = o.processParamObject(data);
    console.log(result);
    expect(result).toStrictEqual({data: {a2: 222}});
})
