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

export type TotalBases = 'oneHit' | 'doubleHit' | 'tripleHit' | 'homerun' | null

export type InputType = 'BallCount' | 'AtBatResult' | 'TotalBases'
