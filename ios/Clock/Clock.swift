//
//  Clock.swift
//  WeatherApp
//
//  Created by CorasanDev on 6/28/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(Clock)
class Clock: RCTEventEmitter {
  var timer: Timer = Timer()

  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func supportedEvents() -> [String]! {
    return ["onTimeChange", "onTimerRunning"]
  }
  
  @objc
  func runTimer() {
    DispatchQueue.main.async(execute: {
      Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(self.time), userInfo: nil, repeats: true)
    })
  }
  
  @objc
  func time() {
    let currentTime = DateFormatter.localizedString(from: Date(), dateStyle: .medium, timeStyle: .medium)
    sendEvent(withName: "onTimeChange", body: ["currentTime": currentTime])
  }

}
