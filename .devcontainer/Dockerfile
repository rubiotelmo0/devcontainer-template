ARG DEBIAN_VERSION=trixie-20251208-slim

FROM debian:${DEBIAN_VERSION}

ARG DEBIAN_FRONTEND=noninteractive

# Base tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    openssh-client \
    sudo \
    locales \
    less \
    procps \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Locale
RUN sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

# Non-root user for VS Code
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/bash \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Temurin JDK 21 from Adoptium tarball
ARG TEMURIN_VERSION=21.0.9
ARG TEMURIN_BUILD=10
ARG TEMURIN_URL="https://github.com/adoptium/temurin21-binaries/releases/download/jdk-${TEMURIN_VERSION}%2B${TEMURIN_BUILD}/OpenJDK21U-jdk_x64_linux_hotspot_${TEMURIN_VERSION}_${TEMURIN_BUILD}.tar.gz"

RUN mkdir -p /opt/temurin-21 \
    && curl -fsSL "${TEMURIN_URL}" -o /tmp/temurin.tar.gz \
    && tar -xzf /tmp/temurin.tar.gz -C /opt/temurin-21 --strip-components=1 \
    && rm /tmp/temurin.tar.gz

ENV JAVA_HOME=/opt/temurin-21
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Gradle from official distribution zip
ARG GRADLE_VERSION=9.2.1
ARG GRADLE_URL="https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip"

RUN mkdir -p /opt/gradle \
    && curl -fsSL "${GRADLE_URL}" -o /tmp/gradle.zip \
    && unzip -d /opt/gradle /tmp/gradle.zip \
    && rm /tmp/gradle.zip

ENV GRADLE_HOME=/opt/gradle/gradle-${GRADLE_VERSION}
ENV PATH="${GRADLE_HOME}/bin:${PATH}"

USER $USERNAME
WORKDIR /workspaces