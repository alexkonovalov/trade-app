import { Trade } from './model';

export const byPaidFirst = (a: Trade, b: Trade) => {
  switch (b.status) {
    case (a.status): return 0;
    case ('paid'): return 1;
    default: return -1;
  }
}

export const byUnseenMessageFirst = (a: Trade, b: Trade) => {
  switch (b.hasUnreadMessage) {
    case (a.hasUnreadMessage): return 0;
    case (true): return 1;
    default: return -1;
  }
}

export const byIsNotReleased = (a: Trade, b: Trade) => {
  switch (b.isReleased) {
    case (a.isReleased): return 0;
    case (false): return 1;
    default: return -1;
  }
}