//
//  Clock.swift
//  WeatherApp
//
//  Created by CorasanDev on 6/28/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(RNClock)
class RNClock: RCTEventEmitter {
  var timer: Timer = Timer()
  var hasListeners: Bool = false

  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func supportedEvents() -> [String]! {
    return ["onTimeChange"]
  }
  
  override func startObserving() {
    hasListeners = true
  }
  
  override func stopObserving() {
    hasListeners = false
  }
  
  @objc
  func initClock() {
    DispatchQueue.main.async(execute: {
      Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(self.time), userInfo: nil, repeats: true)
    })
  }
  
  @objc private
  func time() {
    let currentTime = DateFormatter.localizedString(from: Date(), dateStyle: .none, timeStyle: .short)
    sendEvent(withName: "onTimeChange", body: ["currentTime": currentTime])
  }

}
