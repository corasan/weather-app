//
//  Clock.m
//  WeatherApp
//
//  Created by CorasanDev on 6/28/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_REMAP_MODULE(RNClock, Clock, RCTEventEmitter)

RCT_EXTERN_METHOD(runTimer)
RCT_EXTERN_METHOD(time)

@end
