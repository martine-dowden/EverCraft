import { Component, OnInit } from '@angular/core';
import { Character } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  character = new Character();
  opponent = new Character();
  title = 'app';

  ngOnInit() {
    console.log(this.character);
    this.attack(20);
  }

  setName(name) {
    return this.character.name = name;
  }

  getName() {
    return this.character.name;
  }

  setAlignment(alignment) {
    if (this.verifyAlignment(alignment)) {
      return this.character.alignment = alignment;
    } else {
      return this.character.alignment = undefined;
    }
  }

  getAlignment() {
    return this.character.alignment;
  }

  verifyAlignment(alignment) {
    return alignment === 'Good' || alignment === 'Evil' || alignment === 'Neutral';
  }

  attackSucceeds(roll, opponentAc) {
    const modifier = Math.floor(this.getLevel() / 2);
    return (roll + modifier) >= opponentAc;
  }

  attack(attackRoll) {
    const modifier = this.getBaseModifier(this.character.str);
    let damage;
    if (attackRoll === 20) {
      damage = 2 + (modifier * 2);
      damage = Math.max(damage, 1);
    } else if (this.attackSucceeds(attackRoll + modifier, this.opponent.ac)) {
        damage = 1 + modifier;
        damage = Math.max(damage, 1);
    }
    if (damage) {
      this.opponent.damage = this.opponent.damage - damage;
      this.character.xp += 10;
    }
  }

  isDead(hp) {
    return hp <= 0;
  }

  abilityIsInRange(score) {
    return score >= 1 && score <= 20;
  }

  setAbility(type, value) {
    this.character[type] = value;
  }

  getBaseModifier(attributeValue) {
    return Math.floor((attributeValue - 10) / 2);
  }

  getAc() {
    this.character.ac = this.character.ac + this.getBaseModifier(this.character.dex);
    return this.character.ac;
  }

  getHp() {
    return this.character.hp
    + 5 * (this.getLevel() - 1)
    + this.getBaseModifier(this.character.con) * this.getLevel()
    + this.character.damage;
  }

  getXp() {
    return this.character.xp;
  }

  getLevel() {
    return Math.round(this.character.xp / 1000) + 1;
  }

}
