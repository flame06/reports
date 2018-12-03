import React from 'react'
import booTask from '../components/pages/bossTask'
describe('boss bask index page', () => {
  var i = 0
  beforeEach(() => {
    i = i + 1
    console.log('start' + i)
  })
  afterEach(() => {
    i = 0
    console.log('end' + i)
  })
  it('add test', () => {
    expect(105 + 2).toBe(107);
  });
  it('可以测试对象', function(){
    var foo = {
      a: 12,
      b: 23
    };
    var bar = {
      a: 12,
      b: 23
    };

    expect(foo).toEqual(bar); //true?
  });
  it('可以测试正则表达式', function(){
    var message = "foo bar baz";
    expect(message).toMatch(/bar/);
    expect(message).toMatch("bar");
    expect(message).not.toMatch(/quue/);
  });
  it(' "toBeNull" matcher compares against "null"', function(){
    var a = null;
    var foo = 'foo';

    expect(null).toBeNull();
    expect(a).toBeNull();
    expect(foo).not.toBeNull();
  });

  it('"toBeTruthy， 判断是否为真', () => {
    var a, foo = 'foo'
    expect(foo).toBeTruthy()
    expect(a).not.toBeTruthy()
  })
  it('"toContain" matcher is for finding an item in an array', function(){
    const a = ['foo', 'bar', 'baz'];
    expect(a).toContain('bar');
    expect(a).not.toContain('quu');
  });
  it('toBeLessThan', () => {
    expect('1.23').not.toBe('2')
    expect(1.23).toBeLessThan(2)
  })
  it('"toBeCloseTo（num, numDigit）" 精准匹配。 num表示数字，numDIgit表示四舍五入的位数。', () => {
    var n = 1.99, e = 2.11
    //  表示： 2.31 和 1.19 四舍五入，保留0位小数的时候是相等的。结果为true。所以测试通过。
    // toBeCloseTo, &  toEqual 的不同，前者适合小数的比较。 后者适合整数比较。
    expect(2.31).toBeCloseTo(1.89, 0)
  })


})

describe('a suite', function(){
  beforeEach(function(){
    this.foo = 0;
    this.a = 0
    console.log(this)
  });

  it('can use "this" to share initial data', function(){
    console.log(this)
    expect(this.a).toEqual(0)
    // expect(this.foo).toEqual(0);
    // this.bar = "test pollution?";
  });
  afterEach(() => {
    console.log(this)
  })
  // it('prevents test pollution by having an empty "this" created for next test', function(){
  //   expect(this.foo).toEqual(0);
  //   expect(this.bar).toBe(undefined);
  // });
});

describe('a suite 2', function(){
  var foo;
  beforeEach(function(){
    foo = 0;
    foo += 1;
  });
  afterEach(function(){
    foo = 0;
  });

  it('a spec', function(){
    expect(foo).toEqual(1);
  });
  it('a spec too', function(){
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });

  describe('nested inside describe', function(){
    var bar;

    beforeEach(function(){
      bar = 1;
    });

    // exec outer's describe beforeEach > this describe's beforeEach
    it('可以访问外部describe的beforeEach的变量', function(){
      expect(foo).toEqual(bar);
    });
  });
});
xdescribe('a suite',function(){
  //will not execute
});

describe('a suite too', function(){
  xit('this test be canceled', function(){
    expect(true).toBe(false);
    console.log(12345)
  });

  it('can be desclared with "it" but without a function', function () {
    console.log(123)
  });

  if('can be declared by calling "pending()" in spec body', function(){
    expect(true).toBe(false);
    console.log(1234)
    pending(); //禁用该测试
  });
});

describe('a spy', function(){
  var foo, bar = null;
  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      }
  };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it('tracks that the spy was called', function(){
    expect(foo.setBar).toHaveBeenCalled();
    console.log(1)
  });

  it('tracks all the arguments of its calls', function(){
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it('stops all execution on a function', function(){
    expect(bar).toBeNull(); //setBar函数的执行 被spy监听器暂停了。
  });
});

describe('a spy, when configured to call through', function(){
  var foo , bar, fetchedBar;

  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      },
      getBar: function(){
        return bar;
      }
    };

    spyOn(foo, 'getBar').and.callThrough();

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it('tracks that the spy was called', function(){
    expect(foo.getBar).toHaveBeenCalled();
  });

  it('should not effect other function', function(){
    expect(bar).toEqual(123);
  });

  it('when called returns the requested value' , function(){
    expect(fetchedBar).toEqual(123);
  })
});