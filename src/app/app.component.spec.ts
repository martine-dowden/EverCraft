import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Character } from './model';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));

  it('should have blank default name', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.character.name).toBeUndefined();
  }));

  it('should have setter that works', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const name = 'Conan';
    app.setName(name);
    expect(app.character.name).toEqual(name);
  }));

  it('should have getter that works', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const expectedName = 'Conan';
    app.setName(expectedName);
    const actualName = app.getName();
    expect(actualName).toEqual(expectedName);
  }));

  it('should be align-able', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const alignment = 'Evil';
    app.setAlignment(alignment);
    expect(app.character.alignment).toEqual(alignment);
  }));

  it('should be able to get alignment', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const expectedAlignment = 'Evil';
    app.setAlignment('Evil');
    const alignment = app.getAlignment();
    expect(app.character.alignment).toEqual(alignment);
  }));

  it('is valid alignment works', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const alignments = ['Evil', 'Good', 'Neutral'];
    alignments.forEach((alignment) => {
      expect(app.verifyAlignment(alignment)).toBeTruthy();
    });
    const faillingAlignment = 'Stupid';
    expect(app.verifyAlignment(faillingAlignment)).toBeFalsy();
  }));

  it('should only be align-able for valid alignments', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const invalidAlignment = 'Stupid';
    app.setAlignment(invalidAlignment);
    expect(app.character.alignment).toBeUndefined();
    const validAlignment = 'Evil';
    app.setAlignment(validAlignment);
    expect(app.character.alignment).toEqual(validAlignment);
  }));

  it('should default to 10 AC', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.character.ac).toEqual(10);
  }));

  it('should default to 5 HP', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.character.hp).toEqual(5);
  }));

  it('character can attack', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const goodRoll = 15;
    const opponentAc = 10;
    expect(app.attackSucceeds(goodRoll, opponentAc)).toBeTruthy();
    const badRoll = 8;
    expect(app.attackSucceeds(badRoll, opponentAc)).toBeFalsy();
    const barelyGoodRoll = 10;
    expect(app.attackSucceeds(barelyGoodRoll, opponentAc)).toBeTruthy();
  }));

  it('successful attacks cause damage', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const goodRoll = 15;
    app.opponent = new Character();
    console.log('line 125', app.opponent.hp, app.opponent.damage); // 5
    app.attack(goodRoll);
    console.log('line 127', app.opponent.hp, app.opponent.damage);
    expect(app.opponent.damage).toEqual(-1);
    const badRoll = 8;
    app.attack(badRoll);
    expect(app.opponent.damage).toEqual(-1);
  }));

  it('critical hits do double damage', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const natTwenty = 20;
    app.opponent = new Character();
    app.attack(natTwenty);
    expect(app.opponent.damage).toEqual(-2);
  }));

  it('is epic fail, you died', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const dead = 0;
    const alive = 10;
    const veryDead = -5;
    expect(app.isDead(dead)).toBeTruthy();
    expect(app.isDead(alive)).toBeFalsy();
    expect(app.isDead(veryDead)).toBeTruthy();
  }));

  it('has abilities', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.character.str).toEqual(10);
    expect(app.character.dex).toEqual(10);
    expect(app.character.con).toEqual(10);
    expect(app.character.wis).toEqual(10);
    expect(app.character.int).toEqual(10);
    expect(app.character.cha).toEqual(10);
  }));

  it('is ability in range', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.abilityIsInRange(22)).toBeFalsy();
    expect(app.abilityIsInRange(-1)).toBeFalsy();
    expect(app.abilityIsInRange(10)).toBeTruthy();
  }));

  it('character abilities can be modified', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const newStr = 18;
    app.setAbility('str', newStr);
    expect(app.character.str).toEqual(newStr);
  }));

  it('get modifier for character', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.getBaseModifier(14)).toEqual(2);
  }));

  it('modifier adds to damage', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const newStr = 18;
    app.setAbility('str', newStr);
    app.attack(12);
    expect(app.opponent.damage).toEqual(-5);
  }));

  it('critical hits double strength', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const newStr = 16;
    app.setAbility('str', newStr);
    app.attack(20);
    expect(app.opponent.damage).toEqual(-8);
  }));

  it('minimum damage is 1', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.attack(18);
    expect(app.opponent.damage).toEqual(-1);
  }));

  it('dex adds to ac', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.setAbility('dex', 18);
    const expectedAc = app.character.ac + app.getBaseModifier(app.character.dex);
    const actualAc = app.getAc();
    expect(actualAc).toEqual(expectedAc);
  }));

  it('con adds to hp', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.setAbility('con', 18);
    const expectedHp = app.character.hp + app.getBaseModifier(app.character.con);
    const actualHp = app.getHp();
    expect(actualHp).toEqual(expectedHp);
  }));

  it('characters gain xp', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let expectedXp = 0;
    let actualXp = app.character.xp;
    expect(actualXp).toEqual(expectedXp);
    app.attack(20);
    expectedXp = 10;
    actualXp = app.character.xp;
    expect(actualXp).toEqual(expectedXp);
  }));

  it('get xp', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.getXp()).toEqual(app.character.xp);
  }));

  it('has gettable levels', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let expectedLevel = 1;
    let actualLevel = app.getLevel();
    expect(expectedLevel).toEqual(actualLevel);
    app.character.xp = 1000;
    expectedLevel = 2;
    actualLevel = app.getLevel();
    expect(expectedLevel).toEqual(actualLevel);
    app.character.xp = 2000;
    expectedLevel = 3;
    actualLevel = app.getLevel();
    expect(expectedLevel).toEqual(actualLevel);
  }));

  it('hp increase with level', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.character.damage = 0;
    app.character.con = 12;
    app.character.xp = 1000;
    expect(app.getHp()).toEqual(12);
  }));

  it('attack roll increases with level', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const roll = 9;
    app.attack(roll);
    expect(app.opponent.damage).toEqual(0);
    app.character.xp = 9999;
    app.attack(roll);
    expect(app.opponent.damage).toBeLessThan(0);

    
    expect().toEqual();
  }));
});


