import {ObjectFormatter} from "../src/ObjectFormatter";
import {ILogFormatter, LogFormatterOptions} from '../src/ILogFormatter';
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
