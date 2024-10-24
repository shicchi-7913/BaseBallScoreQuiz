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

export type TotalBases = 'oneHit' | 'doubleHit' | null

export type InputType = BallCount | AtBatResult
