export type BallCount =
  | 'calledStrike'
  | 'swingingStrike'
  | 'ball'
  | 'foulBall'
  | 'buntFoul'
  | 'buntMiss'

export type AtBatResult =
  | 'leftOnBase'
  | 'oneOut'
  | 'twoOut'
  | 'threeOut'
  | 'scoreWithEarnedRun'
  | 'score'
  | null

export type TotalBases =
  | 'oneHit'
  | 'doubleHit'
  | 'tripleHit'
  | 'homerun'
  | 'buntHit'
  | 'infieldHit'
  | null

export type Position =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | null

export type HitInFirst = { position: Position }

export type InputType =
  | 'BallCount'
  | 'AtBatResult'
  | 'TotalBases'
  | 'HitInFirst'
